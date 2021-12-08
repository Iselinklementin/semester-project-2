import { createHtml } from "../common/createHtml.js";
import modal from "../common/modal.js";
import { emptyResult } from "../components/emptyResult.js";
import { favKey } from "../settings/keys.js";
import { clearKey } from "../settings/storage.js";
import { clearBtn } from "../components/elements.js";

export default function clearAll() {
  clearBtn.addEventListener("click", clearAll);

  function clearAll() {
    modal(
      "Are you sure you want to delete all of your favorite products?",
      "Clear all favorites",
      "fav",
      "Clear all",
      confirmed
    );

    function confirmed() {
      clearKey(favKey);
      createHtml([]);
      emptyResult();
    }
  }
}
