
import { useState } from "react";
import { toast } from "sonner";
  //  like in react RTK query we get some imbuilt thing when we fetch data like error, is Loading..
  // Similiary we made a custom hook useFetch which takes a function (like your updateUser) and gives you its state like isLoading data, error etc,
  // so we need it multiple Time so we have to made a custom hook for fetch:- whenever we eftch data from somewher we reuse that hook

const useFetch = (cb) => {  // cb = calllback function, like your updateUser function
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    //before fetching API set these two as this
    console.log("useFetch args:", args);
    setLoading(true); 
    setError(null);

    try {
        // now call the callback function (like updateUser) with the arguments passed to fn, as in updateUser we pass data as argument
        // so cb = udpateUser and args = data ==> updateuser(data)

      const response = await cb(...args); // store what we response get from that in data here 
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;

/* 
function (like your updateUser) and gives you:

✅ State Management for Async Calls
const { data, loading, error, fn } = useFetch(updateUser);


Now you can:

loading – know if a request is in progress

data – get the result of the call

error – catch any errors

fn – call the wrapped function (updateUser) and auto-handle state

It simplifies this logic:

try {
  setLoading(true);
  const result = await updateUser(data);
  setData(result);
  setLoading(false);
} catch (err) {
  setError(err);
  setLoading(false);
}


...into just:

await fn(data);

✅ Shows a toast when an error happens

It also shows an error toast automatically:

toast.error(error.message);


No need to manually handle that every time.

❓ Why Not Just Use useState Directly?

You can, but you’d have to manually repeat logic in every component:

const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

// then handle try/catch for every API call manually


That’s fine for small projects, but as your app grows, custom hooks like useFetch:

✅ Avoid repeating code
✅ Keep your components clean
✅ Make logic reusable
✅ Add global behaviors (like toast) in one place

🔁 Analogy

Think of useFetch as your personal version of useState + fetch + error handling + toast all bundled into one smart tool.
Instead of doing everything manually every time, you just call fn() and it handles the mess.

✅ Summary
Concept	Explanation
You needed the file	Because you were importing a function that didn't exist yet
What it does	Manages async function state: loading, data, error, plus toasts
Why not use useState alone?	You’d have to repeat the same pattern in every component
Benefit	Cleaner code, centralized logic, easier to reuse and debug

Let me know if you want to extend this to:

Handle multiple concurrent requests

Add retry logic

Use react-query or SWR for even better data management

You're on the right track.
*/
