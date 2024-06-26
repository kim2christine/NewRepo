package com.revature.REIMBURSEMENT.PROJECT.models.DTOs;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//This DTO will take in a reimbursement with just description, amount, and an int for userId
//saves us the hassle of trying to send an entire user from the front end
public class IncomingReimbursementDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;
    private String description;
    private String status;

    @Column(nullable=false)
    private int amount;


    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(int amount, String description, String status, int userId) {
        this.amount= amount;
        this.description = description;
        this.status = status;
        this.userId = userId;

    }
    public IncomingReimbursementDTO(String description, int amount, String status) {
        this.amount= amount;
        this.description = description;
        this.status = status;

    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }


    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "userId=" + userId +
                ", description='" + description + '\'' +
                ", amount=" + amount +

                '}';
    }
}