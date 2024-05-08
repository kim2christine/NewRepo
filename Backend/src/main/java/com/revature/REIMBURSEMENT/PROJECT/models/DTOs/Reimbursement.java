package com.revature.REIMBURSEMENT.PROJECT.models.DTOs;


import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="reimbursement")
public class Reimbursement {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int formId;
    private int amount;
    private String description;
    private String status;

    //add new getter/setter/constructor

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Reimbursement() {
        super();
    }



public Reimbursement(int formId, String description, int amount, String status, User user){
        super();
        this.formId=formId;
        this.description= description;
        this.amount= amount;
        this.status=status;
        this.user= user;
}

    public Reimbursement(String description, int amount, String status) {
        this.description = description;
        this.amount = amount;
        this.status = status;
    }

    public int getFormId() {
        return formId;
    }

    public void setFormId(int formId) {
        this.formId = formId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUserId() {
        return user.getUserId();
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "formId=" + formId +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }

}
