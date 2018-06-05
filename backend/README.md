# QuoteBook - Backend

QuoteBook backend instruction.

## Response format
```js
{
  error: true,
  success: true,
  message: 'your message...', // success or error message
  payload: [...], // put your data here
}
```

## Project Structure
- `/routes` - all the routes belong here
- `/handlers` - handler function for any routes
- `/core` - core function like database or helper function

## Routes
- `/openid/facebook` - return facebook login url
