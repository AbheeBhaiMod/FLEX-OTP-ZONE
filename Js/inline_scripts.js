
        // Modified Logic to work with Go Backend (GET Request)
        async function pairNow() {
            const numInput = document.getElementById('phone-num');
            const btn = document.getElementById('pair-btn');
            // Clean input: remove non-numeric chars
            const num = numInput.value.replace(/[^0-9]/g, ''); 

            if(num.length < 10) return alert("Please enter a valid number!");
            
            // UI Loading State
            btn.innerText = "PROCESSING...";
            btn.classList.add("opacity-50", "cursor-not-allowed");
            btn.disabled = true;

            try {
                // Using the specific route from your main.go: /link/pair/NUMBER
                const response = await fetch(`/link/pair/${num}`);
                const result = await response.json();
                
                if (result.code) {
                    // Success Formatting
                    const formattedCode = result.code.match(/.{1,4}/g).join("-");
                    document.getElementById('display-code').innerText = formattedCode;
                    
                    document.getElementById('code-section').classList.remove('hidden');
                    btn.innerText = "SUCCESS";
                    btn.classList.replace("action-btn", "bg-green-600");
                } else {
                    throw new Error(result.error || "Failed");
                }
            } catch (err) {
                console.error(err);
                alert("Connection failed! Make sure the number is correct (e.g., 92300...)");
                btn.innerText = "TRY AGAIN";
                btn.disabled = false;
                btn.classList.remove("opacity-50", "cursor-not-allowed");
                btn.classList.remove("bg-green-600");
                btn.classList.add("action-btn");
            }
        }

        function copyCode() {
            const code = document.getElementById('display-code').innerText.replace(/-/g, ""); // Copy without dashes
            navigator.clipboard.writeText(code);
            alert("Code Copied: " + code);
        }
    
