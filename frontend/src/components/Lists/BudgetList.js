import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const BudgetList = ({ budgets, onEditBudget, onDeleteBudget, totalExpensesByCategory, averageMonthlyExpensesByCategory, percentageSpentByCategory }) => {
  return (
    <List>
      {budgets.map((budget) => {
        const totalExpenses = totalExpensesByCategory(budget.category);
        const overspent = totalExpenses > budget.amount;
        const percentageSpent = percentageSpentByCategory(budget.category);

        return (
          <ListItem key={budget._id}>
            <ListItemText
              primary={budget.category}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color={overspent ? 'error' : 'textPrimary'}
                  >
                    {`Spent: $${totalExpenses}`}
                  </Typography>
                  {` / Budget: $${budget.amount} | Difference: $${(
                    budget.amount - totalExpenses
                  ).toFixed(2)} | Avg. Monthly Expenses: $${averageMonthlyExpensesByCategory(
                    budget.category
                  ).toFixed(2)} | Spent: ${percentageSpent}%`}
                  <LinearProgress
                    variant="determinate"
                    value={overspent ? 100 : parseFloat(percentageSpent)}
                    style={{ marginTop: 8 }}
                  />
                </React.Fragment>
                
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEditBudget(budget)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteBudget(budget._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default BudgetList;
