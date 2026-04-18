import { useState } from 'react';

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const onSubmit = (values) => {
    setIsLoading(true);
    setTimeout(() => {
      setQuotes(getQuotesByTopic(values.topic, 3));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="topic" />
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {quotes.map((quote) => (
            <li key={quote.id}>{quote.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Page;