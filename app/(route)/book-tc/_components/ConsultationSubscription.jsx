import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import io from 'socket.io-client';
const ConsultationSubscription = () => {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    totalConsultations: 8,
    remainingConsultations: 0,
    subscriptionActive: false,
    expiryDate: null,
    amount: 2000 // Amount in INR for 8 consultations
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'default' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    setSocket(socketInstance);

    // Check subscription status on component mount
    const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
    if (userId) {
      socketInstance.emit('check-subscription', userId);
    }

    // Socket event listeners
    socketInstance.on('subscription-status', (data) => {
      setSubscriptionDetails(prev => ({
        ...prev,
        subscriptionActive: data.active,
        remainingConsultations: data.remainingConsultations,
        expiryDate: data.expiryDate
      }));
    });

    socketInstance.on('subscription-update', (data) => {
      if (data.type === 'created') {
        showAlert('Subscription activated successfully!', 'success');
        setSubscriptionDetails(prev => ({
          ...prev,
          subscriptionActive: true,
          remainingConsultations: 8
        }));
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const showAlert = (message, type = 'default') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'default' }), 3000);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/subscription/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: subscriptionDetails.amount
        })
      });

      const data = await res.json();
      if (data.success) {
        handlePaymentVerify(data.data);
      } else {
        showAlert('Failed to create payment order', 'error');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      showAlert('Payment failed to initialize', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: 'MGood Subscription',
      description: '8 Consultation Package',
      order_id: data.id,
      handler: async (response) => {
        try {
          const userId = localStorage.getItem('userId');
          const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/subscription/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            socket.emit('subscription-created', {
              userId,
              subscriptionId: verifyData.subscription._id
            });
          } else {
            showAlert('Payment verification failed', 'error');
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          showAlert('Payment verification failed', 'error');
        }
      },
      theme: {
        color: '#5f63b8'
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleBookConsultation = () => {
    router.push('/book-consultation');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {alert.show && (
        <Alert variant={alert.type === 'error' ? 'destructive' : 'default'} className="mb-4">
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Medical Consultation Package
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Subscription Status</span>
              <Badge variant={subscriptionDetails.subscriptionActive ? "success" : "secondary"}>
                {subscriptionDetails.subscriptionActive ? "Active" : "Inactive"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscriptionDetails.subscriptionActive && (
              <>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    Remaining Consultations
                  </span>
                  <span className="font-semibold">{subscriptionDetails.remainingConsultations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                    Expiry Date
                  </span>
                  <span className="font-semibold">
                    {new Date(subscriptionDetails.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {subscriptionDetails.subscriptionActive ? 'Your Active Package' : 'Purchase Package'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-primary">₹{subscriptionDetails.amount}</p>
              <p className="text-gray-600">8 Consultations Package</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Access to all specialties
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                Valid for 3 months
              </div>
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-purple-500" />
                24/7 doctor availability
              </div>
            </div>

            {subscriptionDetails.subscriptionActive ? (
              <Button 
                className="w-full"
                onClick={handleBookConsultation}
                disabled={subscriptionDetails.remainingConsultations === 0}
              >
                Book Consultation
              </Button>
            ) : (
              <Button 
                className="w-full"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Purchase Package'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsultationSubscription;