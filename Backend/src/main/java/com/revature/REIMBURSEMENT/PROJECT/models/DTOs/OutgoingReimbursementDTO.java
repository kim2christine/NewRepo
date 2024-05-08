package com.revature.REIMBURSEMENT.PROJECT.models.DTOs;

import java.util.List;

//This DTO will send reimbursement with only formId, description, amount, userId
//We DON'T want to send entire user object
//In order to keep the password safe and avoid ugly recursive issues in the data
//(Reimbursement has User which has List<Reimbursement> which each have User... etc.)
public class OutgoingReimbursementDTO {

    private int formId;
    private String description;
    private int amount;
    private String username;
    private String status;

    public OutgoingReimbursementDTO() {
    }

    public OutgoingReimbursementDTO(int formId, String description, int amount, String username, String status) {
        this.formId= formId;
        this.description= description;
        this.amount=amount;
        this.username= username;
        this.status=status;

    }

    public OutgoingReimbursementDTO(int formId, String description, int amount, String pending, int userId) {
    }

    public int getFormId() {
        return formId;
    }

    public void setFormId(int formId) {
        this.formId = formId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OutgoingReimbursementDTO{" +
                "formId=" + formId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", username=" + username +
                ", status='" + status + '\'' +
                '}';
    }
}
