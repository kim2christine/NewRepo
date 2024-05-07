package com.revature.REIMBURSEMENT.PROJECT.DAOS;


import com.revature.REIMBURSEMENT.PROJECT.models.DTOs.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {
    public List<Reimbursement> findByUserUserId(int userId);
}

