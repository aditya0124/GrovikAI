import { isRedirectError } from "next/dist/client/components/redirect-error";

/**
 * Executes an async action and handles success/failure
 * @param {Object} options
 * @param {Function} options.actionFn - The async function to execute
 * @param {string} [options.successMessage] - Optional success message
 * @returns {Promise<{ success: boolean, message: string }>}
 */
const executeAction = async ({ actionFn, successMessage = "The action was successful" }) => {
  try {
    await actionFn();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "An error has occurred during executing the action",
    };
  }
};

export { executeAction };

/* 
  This utility function `executeAction` helps you run any asynchronous action 
  safely, providing a consistent way to handle success and error messages.

  It takes an object with:
    - actionFn: an async function that performs the action
    - successMessage (optional): a message to return if the action succeeds

  If the action succeeds, it returns:
    { success: true, message: successMessage }

  If the action fails, it checks if the error is a redirect error (used internally by Next.js).
    - If yes, it rethrows the error (so Next.js can handle the redirect)
    - If not, it returns a generic failure message:
      { success: false, message: "An error has occurred during executing the action" }

  This helps keep your code DRY by centralizing async action error handling.

  Note: This depends on Next.js’s internal `isRedirectError` utility, so it requires Next.js 13+.
*/
