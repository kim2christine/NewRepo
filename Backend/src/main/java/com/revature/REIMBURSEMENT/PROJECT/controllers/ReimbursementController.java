package com.revature.REIMBURSEMENT.PROJECT.controllers;


import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.IncomingReimbursementDTO;
import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.Reimbursement;
import com.revature.REIMBURSEMENT.PROJECT.services.ReimbursementService;
import com.revature.REIMBURSEMENT.PROJECT.services.UserService;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revature.REIMBURSEMENT.PROJECT.DAOS.ReimbursementDAO;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/reimbursement") //front end has to match
@CrossOrigin(origins= "http://localhost:3000",allowCredentials="true")


public class ReimbursementController {
    private ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }


    //post mapping for inserting a new request



    @PostMapping("/add")
    public ResponseEntity<String> addReimbursement(@RequestBody IncomingReimbursementDTO reimbursementDTO, HttpSession session){

        //If the user is not logged in (if the userId is null), send back a 401
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must be logged in to submit reimbursements!");
        }

        //Now that we have user info saved (in our HTTP Session), we can attach the stored user Id to the pokeDTO
        reimbursementDTO.setUserId((int) session.getAttribute("userId"));

        //why do we need to cast to an int? getAttribute returns an Object

        //TODO: try/catch once we decide to do some error handling
       Reimbursement p = reimbursementService.addReimbursement(reimbursementDTO);

        return ResponseEntity.status(201).body(
                p.getUser().getUsername() + " submitted " + p.getUser().getUserId());

    }

    @GetMapping
    public ResponseEntity<?> getAllReimbursement(int userId, HttpSession session){

        //Login check
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must be logged in to see your Reimbursements!");
        }

        //Get the userId from the session
        int userId = (int) session.getAttribute("userId");

        //Why return in many line when one line do trick?
        return ResponseEntity.ok(reimbursementService.getAllReimbursement(userId));

    }

    @DeleteMapping("/formId}")
    public ResponseEntity<String> releaseReimbursement(@PathVariable int formId, HttpSession session){

        //Login check
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must be logged in to resolve reimbursements!");
        }

        //Get the userId from the session
        int userId = (int) session.getAttribute("userId");

        //try/catch the service method, either returning a confirmation or error message
        try {
            return ResponseEntity.ok(reimbursementService.releaseReimbursement(formId, userId));
        } catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }


  //  @GetMapping
   // public ResponseEntity<?> getMagic(@RequestParam(required = false) String filter){
//        if(session.getAttribute("userId") == null){
//            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
//        }
    //   int userId = (int)session.getAttribute("userId");
 //       List<Reimbursement> reimbs = reimbursementService.getAllReimbursement(1,filter);

 //       return ResponseEntity.ok(reimbs);
//    }




//    @PutMapping("/description/{formId}")
//    public ResponseEntity<?> updateDescription(@PathVariable int formId, @RequestBody String description, HttpSession session) {
//        if (session.getAttribute("userId") == null) {
//            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
//        }
//        try {
//            Reimbursement reimbursement = reimbursementService.updateReimbursement(formId, description, (int) session.getAttribute("userId"));
//            return ResponseEntity.ok(reimbursement);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(404).body(e.getMessage());
//        }
//    }

    @PutMapping("/{formId}")
    public ResponseEntity<?> updateStatus(@PathVariable int formId, @RequestBody Reimbursement reimbursement, HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must login to see your reimbursement!");
        }
//            if(!"manager".equalsIgnoreCase((String)session.getAttribute("role"))){
//                return ResponseEntity.status(401).body("Only managers are allowed to see resolve a reimbursement");
//            }
        try{
            Reimbursement resolved = reimbursementService.updateStatus(formId, reimbursement);
            return ResponseEntity.ok(resolved);
        }catch(RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}