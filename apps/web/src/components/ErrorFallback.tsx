import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={3}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <ErrorIcon
          color="error"
          sx={{ fontSize: 64, mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={resetErrorBoundary}
            sx={{ minWidth: 120 }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            onClick={() => window.location.href = '/'}
            sx={{ minWidth: 120 }}
          >
            Go Home
          </Button>
        </Box>
        {process.env.NODE_ENV === 'development' && (
          <Box mt={3} p={2} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="caption" component="pre" sx={{ textAlign: 'left' }}>
              {error.message}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
} 