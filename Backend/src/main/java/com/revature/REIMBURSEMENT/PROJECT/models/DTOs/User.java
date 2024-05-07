package com.revature.REIMBURSEMENT.PROJECT.models.DTOs;



import jakarta.persistence.*;
        import org.springframework.stereotype.Component;

import java.util.List;


@Component
@Entity
@Table(name="users")
public class User {

    //userId, username, password, no args, all args minus id, all args, getter/setter, tostring

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(unique = true)
    private String username;
    private String password;
    private String role;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reimbursement> reimbursement;

    public User() {
        super(); //this calls to the parent constructor, it happens anyway
    }

    public User(String username, String password, String role) {
        super();
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User(int userId, String username, String password, String role) {
        super();
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role= role;
    }

    public void setReimbursement(List<Reimbursement> reimbursement) {
        this.reimbursement = reimbursement;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Reimbursement> getReimbursement() {
        return reimbursement;
    }

    public void setPokemon(List<Reimbursement> reimbursement) {
        this.reimbursement = reimbursement;
    }


    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", reimbursement=" + reimbursement +
                '}';
    }
}