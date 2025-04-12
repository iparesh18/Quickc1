document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search-state");
    const results = document.getElementById("helpline-results");
  
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      results.innerHTML = "";
  
      if (query === "") return;
  
      const matchedState = Object.keys(helplines).find(
        (state) => state.toLowerCase() === query
      );
  
      if (!matchedState) {
        results.innerHTML = `<p style="color:red;">No helpline found for that state.</p>`;
        return;
      }
  
      const entries = helplines[matchedState];
      entries.forEach((entry) => {
        const el = document.createElement("div");
        el.className = "pet-helpline-card";
        el.innerHTML = `
          <h3>${entry.name}</h3>
          <p>${entry.description}</p>
          <p><strong>Phone:</strong> ${entry.number}</p>
          <a href="tel:${entry.number.replace(/[^+\d]/g, "")}" class="pet-btn">📞 Call Now</a>
        `;
        results.appendChild(el);
      });
    });
  });
  