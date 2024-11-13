import { useState, useEffect } from 'react';

export function useQuoteData() {
  const [quote, setQuote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = () => {
    fetch(`https://api.api-ninjas.com/v1/quotes?category=success`, {
      headers: {
        'X-Api-Key': 'mbInCsrIPFbP+6+hiJHcMA==Hwts6J4JqKIPlkYp'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        if (json && json[0] && json[0].quote) {
          setQuote(json[0].quote); 
          setError(null);
        } else {
          setError('Quote not found');
          setQuote(null);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('An error occurred');
        setQuote(null);
      });
  };
  
  useEffect(() => {
    fetchQuote(); 
  }, []); 

  return { quote, fetchQuote, error };
}
