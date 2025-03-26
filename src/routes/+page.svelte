<script lang="ts">
    import MarkdownIt from "markdown-it";

    let response = "";
    let chat = "";
    let isTyping = false;
    const md = new MarkdownIt();

    const onSubmit = async () => {
        if (!chat.trim()) return;

        isTyping = true;
        response = "";

        const req = await fetch("http://localhost:5173/api", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat }) 
        });
        const res2 = await req.json();

        response = res2.message?.content || "";
        isTyping = false;
        chat = ""; // Clear input after sending
    };
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background: radial-gradient(circle at center, #0d1b2a 0%, #1b263b 100%);
        font-family: "Orbitron", "Segoe UI", sans-serif;
        color: #e0e0e0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .chat-interface {
        width: 100%;
        max-width: 1000px;
        height: 85vh;
        background: rgba(20, 33, 61, 0.85);
        border-radius: 30px 30px 0 0;
        box-shadow: 0 0 50px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        border: 2px solid #00d4ff;
    }

    .response-display {
        flex: 1;
        padding: 40px;
        background: linear-gradient(145deg, rgba(27, 38, 59, 0.9), rgba(15, 25, 45, 0.7));
        border-radius: 20px 20px 0 0;
        overflow-y: auto;
        font-size: 1.2rem;
        line-height: 1.9;
        color: #b0eaff;
        position: relative;
        z-index: 1;
    }

    .response-display::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
        opacity: 0.5;
        z-index: -1;
    }

    .response-display:empty {
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: italic;
        color: #778da9;
    }

    .status-orbit {
        padding: 12px;
        background: rgba(0, 212, 255, 0.15);
        text-align: center;
        font-size: 0.95rem;
        color: #00d4ff;
        border-top: 1px solid rgba(0, 255, 255, 0.2);
        border-bottom: 1px solid rgba(0, 255, 255, 0.2);
        position: relative;
    }

    .status-orbit.active::after {
        content: "◉";
        margin-left: 8px;
        animation: orbit-pulse 1.5s infinite;
    }

    .input-dock {
        display: flex;
        align-items: center;
        padding: 25px 40px;
        background: rgba(15, 25, 45, 0.95);
        border-top: 2px solid #00d4ff;
        position: relative;
    }

    .input-dock::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        width: 50px;
        height: 2px;
        background: #00d4ff;
        transform: translateX(-50%);
    }

    input {
        flex: 1;
        border: none;
        outline: none;
        padding: 16px 25px;
        font-size: 1.1rem;
        background: rgba(255, 255, 255, 0.05);
        color: #e0e0e0;
        border-radius: 15px 0 0 15px;
        border: 2px solid #00d4ff;
        border-right: none;
        transition: background 0.3s ease;
        box-shadow: inset 0 0 10px rgba(0, 212, 255, 0.2);
    }

    input:focus {
        background: rgba(255, 255, 255, 0.1);
    }

    input::placeholder {
        color: #778da9;
    }

    button {
        background: linear-gradient(135deg, #00d4ff 0%, #00aaff 100%);
        border: 2px solid #00d4ff;
        padding: 16px 35px;
        border-radius: 0 15px 15px 0;
        color: #0d1b2a;
        font-weight: 600;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
    }

    button:hover {
        background: linear-gradient(135deg, #00aaff 0%, #0077cc 100%);
        transform: scale(1.03);
        box-shadow: 0 0 25px rgba(0, 212, 255, 0.8);
    }

    button:active {
        transform: scale(0.97);
    }

    @keyframes orbit-pulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }

    @media (max-width: 768px) {
        .chat-interface {
            width: 95%;
            height: 90vh;
            margin: 10px;
        }

        .response-display {
            padding: 20px;
            font-size: 1rem;
        }

        .input-dock {
            padding: 15px 20px;
        }

        button {
            padding: 12px 25px;
        }
    }
</style>

<div class="chat-interface">
    <div class="response-display">
        {#if response}
            {@html md.render(response.replace(/^[\s\S]*<\/think>(?![\s\S]*<\/think>)/g, ""))}
        {:else}
            Initiating transmission...
        {/if}
    </div>

    {#if isTyping}
        <div class="status-orbit active">Processing signal</div>
    {:else}
        <div class="status-orbit">Awaiting input</div>
    {/if}

    <div class="input-dock">
        <input type="text" bind:value={chat} placeholder="Transmit message..." on:keypress={(e) => e.key === 'Enter' && onSubmit()} />
        <button on:click={onSubmit}>Send</button>
    </div>
</div>