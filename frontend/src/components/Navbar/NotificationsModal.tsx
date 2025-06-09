// src/components/NotificationsModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
  notifications: string[];
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ open, onClose, notifications }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="notifications-modal-title">
        Powiadomienia
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="notifications-modal-content">
        <List>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="Brak powiadomień." />
            </ListItem>
          ) : (
            notifications.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={msg} />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
