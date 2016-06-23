const output = [];
const message = 'the powerful thing about custom elements is that you can bundle tailored functionality with the element by defining properties and methods on the element definition. Think of this as a way to create a public API for your element. Elements can also define special methods for tapping into interesting times of their existence. These methods are appropriately named the lifecycle callbacks Each has a specific name and purpose';

const generateTextMessage = () => {
    const words = message.split(' ').sort(() => Math.random() > 0.5);
    const punctuationSigns = [',', ':', ';', '...'].sort(() => Math.random() > 0.5);

    const outputText = [];
    let i = 0;

    while (words.length) {
        const word = words.pop().trim();
        outputText.push(word);

        if (words.length % 12 === 0) {
            outputText.push(punctuationSigns[i]);
            i++;
        }
    }

    return outputText.join(' ');
};

for (let i = 0; i < 10; i++) {
    const threadsPerDay = Math.round(Math.random() * 10);
    console.log(`Threads per day #${i}: ${threadsPerDay}`);

    const date = new Date;
    date.setDate(date.getDate() - i);

    for (let j = 0; j < threadsPerDay; j++) {
        const participantsNum = Math.max(Math.round(Math.random() * 5), 2);
        const threadParticipants = [0, 1, 2, 3, 4].sort(() => Math.random() > 0.5).slice(0, participantsNum);
        const menuItem = ['inbox', 'done', 'ruka2013'].sort(() => Math.random() > 0.5)[0];

        const thread = {
            id: `thread-${i}-${j}`,
            lastDate: date,
            avatar: threadParticipants[0],
            participants: threadParticipants,
            checked: false,
            open: false,
            menuItem,
            active: false,
            messages: []
        };

        const messagesPerThread = Math.round(Math.random() * 30);
        for (let k = 0; k < messagesPerThread; k++) {
            let messageDate = new Date(date);
            messageDate.setHours(messageDate.getHours() - j - Math.random() * 10 * k);

            const messageUsers = [...threadParticipants].sort(() => Math.random() > 0.5);

            thread.messages.push({
                id: `thread-${i}-${j}-${k}`,
                active: false,
                date: messageDate,
                sender: messageUsers[0],
                recipients: messageUsers.slice(1, Math.random() > 0.5 ? 3 : 2),
                message: generateTextMessage(),
                conversationExpanded: false,
                expanded: false,
                advanced: false
            });
        }

        output.push(thread);
    }
}

copy(JSON.stringify(output, null, '    '));
