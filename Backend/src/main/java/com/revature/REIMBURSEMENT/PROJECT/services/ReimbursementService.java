package com.revature.REIMBURSEMENT.PROJECT.services;



import com.revature.REIMBURSEMENT.PROJECT.DAOS.ReimbursementDAO;
import com.revature.REIMBURSEMENT.PROJECT.DAOS.UserDAO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.IncomingReimbursementDTO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.OutgoingReimbursementDTO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.Reimbursement;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.User;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReimbursementService {

    private ReimbursementDAO reimbursementDAO;
    private UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, UserDAO userDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.userDAO = userDAO;
    }


    public Reimbursement addReimbursement(IncomingReimbursementDTO reimbursementDTO) {
        //we need to get the User by id, and set it with the setter
        Reimbursement p = new Reimbursement(reimbursementDTO.getDescription(), reimbursementDTO.getAmount());

        //Instantiate the appropriate user
        User u = userDAO.findById(reimbursementDTO.getUserId()).get();
        p.setUser(u);
        return reimbursementDAO.save(p);
    }


    public List<OutgoingReimbursementDTO> getAllReimbursement(int userId) {


        List<Reimbursement> allReimbursement = reimbursementDAO.findByUserUserId(userId);

        List<OutgoingReimbursementDTO> outReimbursement = new ArrayList<>();

        for (Reimbursement p : allReimbursement) {
            OutgoingReimbursementDTO outP = new OutgoingReimbursementDTO(
                    p.getFormId(),
                    p.getDescription(),
                    p.getAmount(),
                    p.getUser().getUserId(),
                    p.getStatus()
            );

            outReimbursement.add(outP);
        }

        return outReimbursement;

    }

    //delete reimbursement by ID
    public String releaseReimbursement(int formId, int userId) {

        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(formId);

        if (optionalReimbursement.isEmpty()) {
            throw new NoSuchElementException("Reimbursement not found! Can't delete");
        }

        Reimbursement reimbursement = optionalReimbursement.get();

        if (reimbursement.getUser().getUserId() != userId) {
            throw new IllegalArgumentException("You can only delete your own reimbursement!");
        }

        //The pokemon won't fully delete until you remove it from BOTH tables!
        reimbursement.getUser().getReimbursement().remove(reimbursement);
        reimbursementDAO.deleteById(formId);

        return reimbursement.getFormId() + " was resolved!";
    }


    public List<Reimbursement> getAllReimbursementByManager(String status) {
        List<Reimbursement> allReimbs = reimbursementDAO.findAll();
        List<Reimbursement> reimbRes = new ArrayList<>();
        if (!"all".equalsIgnoreCase(status)) {
            reimbRes = allReimbs.stream()
                    .filter(reim -> reim.getStatus().equalsIgnoreCase(status))
                    .toList();
        } else {
            reimbRes = allReimbs;
        }
        return reimbRes;
    }

    public Reimbursement resolveReimbursement(int formId, String status) {
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(formId);
        if (optionalReimbursement.isEmpty()) {
            throw new RuntimeException("optionalReimbursement Not Found!");
        }
        Reimbursement reimbursement = optionalReimbursement.get();
        reimbursement.setStatus(status);
        return reimbursementDAO.save(reimbursement);
    }


    public Reimbursement updateStatus(int formId, Reimbursement reimbursement) {
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(formId);
        if (optionalReimbursement.isEmpty()) {
            throw new RuntimeException("optionalReimbursement Not Found!");
        }

        Reimbursement resolved = optionalReimbursement.get();

        resolved.setStatus(reimbursement.getStatus());
        return reimbursementDAO.save(reimbursement);
    }

}
