'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  PaymentIcon,
  TimerIcon,
  SuccessIcon,
  ErrorIcon,
  InfoIcon,
  CloseIcon,
  SecurityIcon,
  SecurityLockIcon,
  AwardIcon,
} from './icons';

interface PaymentDetails {
  amount: number;
  currency: string;
  method: 'credit_card' | 'debit_card' | 'cash' | 'transfer';
  description: string;
  reservationId?: string;
}

interface PaymentProcessorProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
  paymentDetails: PaymentDetails;
}

const steps = [
  {
    label: 'Payment Details',
    description: 'Review payment information',
  },
  {
    label: 'Payment Method',
    description: 'Select and enter payment method',
  },
  {
    label: 'Confirmation',
    description: 'Confirm and process payment',
  },
];

export function PaymentProcessor({ 
  open, 
  onClose, 
  onSuccess, 
  paymentDetails 
}: PaymentProcessorProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPaymentMethod('credit_card');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardholderName('');
    setProcessing(false);
    setError(null);
    setSuccess(false);
  };

  const handleProcessPayment = async () => {
    setProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure
      const isSuccess = Math.random() > 0.1; // 90% success rate
      
      if (isSuccess) {
        setSuccess(true);
        const paymentId = `PAY${Date.now()}`;
        setTimeout(() => {
          onSuccess(paymentId);
          handleClose();
        }, 1500);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during payment processing.');
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <PaymentIcon />
          <Typography variant="h6">
            Payment Processing
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    {index === 0 && (
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Payment Summary
                          </Typography>
                          <Box sx={{ display: 'grid', gap: 1 }}>
                            <Box display="flex" justifyContent="space-between">
                              <Typography>Amount:</Typography>
                              <Typography fontWeight="bold">
                                ${paymentDetails.amount} {paymentDetails.currency}
                              </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography>Description:</Typography>
                              <Typography>{paymentDetails.description}</Typography>
                            </Box>
                            {paymentDetails.reservationId && (
                              <Box display="flex" justifyContent="space-between">
                                <Typography>Reservation ID:</Typography>
                                <Chip label={paymentDetails.reservationId} size="small" />
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    )}

                    {index === 1 && (
                      <Box sx={{ display: 'grid', gap: 2 }}>
                        {/* Payment Method Selection */}
                        <Box sx={{ display: 'grid', gap: 2 }}>
                          <TextField
                            label="Payment Method"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            fullWidth
                          />
                          {/* Add more payment method options here if needed */}
                        </Box>

                        {/* Credit Card Details */}
                        {paymentMethod.includes('card') && (
                          <Box sx={{ display: 'grid', gap: 2 }}>
                            <TextField
                              label="Card Number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              placeholder="1234 5678 9012 3456"
                              fullWidth
                            />
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                              <TextField
                                label="Expiry Date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                placeholder="MM/YY"
                                fullWidth
                              />
                              <TextField
                                label="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                placeholder="123"
                                fullWidth
                              />
                            </Box>
                            <TextField
                              label="Cardholder Name"
                              value={cardholderName}
                              onChange={(e) => setCardholderName(e.target.value)}
                              fullWidth
                            />
                          </Box>
                        )}
                      </Box>
                    )}

                    {index === 2 && (
                      <Box>
                        <Alert severity="info" sx={{ mb: 2 }}>
                          Please review your payment details before proceeding.
                        </Alert>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Payment Confirmation
                            </Typography>
                            <Box sx={{ display: 'grid', gap: 1 }}>
                              <Box display="flex" justifyContent="space-between">
                                <Typography>Amount:</Typography>
                                <Typography fontWeight="bold">
                                  ${paymentDetails.amount} {paymentDetails.currency}
                                </Typography>
                              </Box>
                              <Box display="flex" justifyContent="space-between">
                                <Typography>Method:</Typography>
                                <Chip label={paymentMethod.replace('_', ' ')} size="small" />
                              </Box>
                              {cardNumber && (
                                <Box display="flex" justifyContent="space-between">
                                  <Typography>Card:</Typography>
                                  <Typography variant="body2">
                                    **** **** **** {cardNumber.slice(-4)}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    )}

                    {success && (
                      <Box sx={{ textAlign: 'center', py: 2 }}>
                        <SuccessIcon style={{ fontSize: 48, color: '#2e7d32', marginBottom: 16 }} />
                        <Typography variant="h6" gutterBottom>
                          Payment Successful!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Your payment has been processed successfully.
                        </Typography>
                      </Box>
                    )}

                    {error && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                      </Alert>
                    )}

                    <Box sx={{ mt: 2 }}>
                      {index === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={handleProcessPayment}
                          disabled={processing}
                          startIcon={processing ? <TimerIcon /> : <PaymentIcon />}
                        >
                          {processing ? 'Processing...' : 'Process Payment'}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mr: 1 }}
                        >
                          Continue
                        </Button>
                      )}
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
} 