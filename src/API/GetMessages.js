const apiKey = "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";
const url = "https://api.openai.com/v1/chat/completions";

export const getMessage = async (prompt) => {
    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                stream: true,
            }),
        });

        const reader = resp.body.getReader();
        const decoder = new TextDecoder("utf-8");
        while (true) {
            const chunk = await reader.read();
            const { done, value } = chunk;

            if (done) {
                break;
            }
            const decodedChunk = decoder.decode(value);
            const lines = decodedChunk.split("\n");
            const parsedLines = lines
                .map((line) => line.replace(/^data: /, "").trim())
                .filter((line) => line !== "" && line !== "[DONE]")
                .map((line) => JSON.parse(line));

            for (const parsedLine of parsedLines) {
                const { choices } = parsedLine;
                const { delta } = choices[0];
                const { content } = delta;
                if (content) {
                }
            }

            // console.log(parsedLines);
        }
    } catch (error) {
        console.log(error);
    } finally {
    }
};
