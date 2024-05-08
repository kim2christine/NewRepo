package com.revature.REIMBURSEMENT.PROJECT.services;



import com.revature.REIMBURSEMENT.PROJECT.DAOS.ReimbursementDAO;
import com.revature.REIMBURSEMENT.PROJECT.DAOS.UserDAO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.*;

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
        Reimbursement p = new Reimbursement(reimbursementDTO.getDescription(), reimbursementDTO.getAmount(), reimbursementDTO.getStatus());

        //Instantiate the appropriate user
        User u = userDAO.findById(reimbursementDTO.getUserId()).get();
        p.setUser(u);
        return reimbursementDAO.save(p);
    }


    public List<Reimbursement> getAllReimbursement(int userId) {
        Optional<User> optUser = userDAO.findById(userId);
        if (optUser.isEmpty()) {
            throw new NoSuchElementException("User not found!");
        }
        User u = optUser.get();
        List<Reimbursement> allReimbursement;

        if(u.getRole().equalsIgnoreCase("Employee")){
            allReimbursement = reimbursementDAO.findByUserUserId(userId);
        } else {
            allReimbursement = reimbursementDAO.findAll();
        }


        List<OutgoingReimbursementDTO> outReimbursement = new ArrayList<>();

        for (Reimbursement p : allReimbursement) {
            Optional<User> u1 = userDAO.findById(p.getUserId());
            if (u1.isEmpty()) {
                throw new NoSuchElementException("User not found!");
            }
            User user = u1.get();
            OutgoingReimbursementDTO outP = new OutgoingReimbursementDTO(
                    p.getFormId(),
                    p.getDescription(),
                    p.getAmount(),
                    user.getUsername(),
                    p.getStatus()
            );

            outReimbursement.add(outP);
        }

        return allReimbursement;

    }

    public List<OutgoingReimbursementDTO> getAllReimbursementEmployee(int userId) {


        List<Reimbursement> allReimbursement = reimbursementDAO.findByUserUserId(userId);

        List<OutgoingReimbursementDTO> outReimbursement = new ArrayList<>();

        for (Reimbursement p : allReimbursement) {
            Optional<User> u = userDAO.findById(p.getUserId());
            if (u.isEmpty()) {
                throw new NoSuchElementException("User not found!");
            }
            User user = u.get();
            OutgoingReimbursementDTO outP = new OutgoingReimbursementDTO(
                    p.getFormId(),
                    p.getDescription(),
                    p.getAmount(),
                    user.getUsername(),
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
        Optional<User> optionalUser = userDAO.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new NoSuchElementException("User not found! Can't delete");
        }
        User user = optionalUser.get();
        if (reimbursement.getUserId() != userId) {
            if (user.getRole().equalsIgnoreCase("Manager")) {
                user.getReimbursement().remove(reimbursement);
               //reimbursement.getUser().getReimbursement().remove(reimbursement);
                reimbursementDAO.deleteById(formId);
                return reimbursement.getFormId() + " was resolved!";
            }
            throw new IllegalArgumentException("You can only delete your own reimbursement!");
        }


        user.getReimbursement().remove(reimbursement);
        reimbursementDAO.deleteById(formId);

        return reimbursement.getFormId() + " was resolved!";
    }


    public List<OutgoingReimbursementDTO> getAllReimbursementByManager(String status) {
        System.out.println(status);
        List<Reimbursement> allReimbs;
        if (status.equalsIgnoreCase("all")) {
            allReimbs = reimbursementDAO.findAll();
        } else {
            allReimbs = reimbursementDAO.findAllByStatus(status);
        }
        List<OutgoingReimbursementDTO> reimbRes = new ArrayList<>();
        for (Reimbursement r : allReimbs) {
            Optional<User> u = userDAO.findById(r.getUserId());
            if (u.isEmpty()) {
                throw new NoSuchElementException("User not found!");
            }
            User user = u.get();
            OutgoingReimbursementDTO outReimb = new OutgoingReimbursementDTO(
                    r.getFormId(),
                    r.getDescription(),
                    r.getAmount(),
                    user.getUsername(),
                    r.getStatus()
            );
            reimbRes.add(outReimb);
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


    public Reimbursement updateStatus(int formId, String status) {
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(formId);
        if (optionalReimbursement.isEmpty()) {
            throw new RuntimeException("optionalReimbursement Not Found!");
        }

        Reimbursement resolved = optionalReimbursement.get();

        resolved.setStatus(status);
        return reimbursementDAO.save(resolved);
    }


    //add a function in the service layer to match getMagic in the controller layer


}
