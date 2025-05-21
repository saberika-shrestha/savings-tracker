function escapeMarkdownV2(text) {
    return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
export function formatMessageAllMonths(entries) {
    const grouped = entries
        .filter((entry) => typeof entry.amount === 'number' && entry.description.trim())
        .map((entry) => {
        const date = new Date(entry.timestamp || Date.now());
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const header = `*${escapeMarkdownV2(`${month} ${day}`)}*`;
        const amount = `\`${entry.amount}\``;
        const description = `_${escapeMarkdownV2(entry.description)}_`;
        return { header, line: `   • ${amount} — ${description}` };
    })
        .reduce((acc, { header, line }) => {
        if (!acc[header])
            acc[header] = [];
        acc[header].push(line);
        return acc;
    }, {});
    return Object.entries(grouped)
        .map(([header, lines]) => `${header}\n${lines.join('\n')}`)
        .join('\n\n');
}
export function formatMessageByMonth(month, entries) {
    let total = 0;
    const grouped = entries
        .filter((entry) => {
        if (typeof entry.amount !== 'number' || !entry.description.trim())
            return false;
        const entryDate = new Date(entry.timestamp || Date.now());
        const entryMonth = String(entryDate.getMonth() + 1).padStart(2, '0'); // '05'
        return entryMonth === month;
    })
        .map((entry) => {
        total += entry.amount;
        const date = new Date(entry.timestamp || Date.now());
        const day = date.getDate();
        const monthName = date.toLocaleString('en-US', { month: 'long' });
        const header = `*${escapeMarkdownV2(`${monthName} ${day}`)}*`;
        const amount = `\`${entry.amount}\``;
        const description = `_${escapeMarkdownV2(entry.description)}_`;
        return { header, line: `   • ${amount} — ${description}` };
    })
        .reduce((acc, { header, line }) => {
        if (!acc[header])
            acc[header] = [];
        acc[header].push(line);
        return acc;
    }, {});
    if (Object.keys(grouped).length === 0) {
        return 'No savings found for this month\\.';
    }
    const body = Object.entries(grouped)
        .map(([header, lines]) => `${header}\n${lines.join('\n')}`)
        .join('\n\n');
    const totalLine = `\n───────────────\n*Total Savings:* \`${total.toFixed(2)}\``;
    return body + totalLine;
}
