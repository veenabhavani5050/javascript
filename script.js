let entries = [];
let editId = null;

function addOrUpdateEntry() {
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    if (!description || !amount) return;

    if (editId !== null) {
        entries[editId] = { description, amount, type };
        editId = null;
    } else {
        entries.push({ description, amount, type });
    }

    renderEntries();
    resetForm();
}
// total table data functionality 
function renderEntries() {
    const list = document.getElementById("entriesList");
    list.innerHTML = "";

    entries.forEach((entry, index) => {
        const li = document.createElement("li");
        li.classList.add("flex", "justify-between", "p-2", "border-b");
        li.innerHTML = `
            ${entry.description} - $${entry.amount} 
            <span class="${entry.type === 'income' ? 'text-green-500' : 'text-red-500'}">${entry.type}</span>
            <button onclick="editEntry(${index})" class="text-blue-500"><i class="fa-solid fa-pen-to-square"></i></button>
            <button onclick="deleteEntry(${index})" class="text-red-500"><i class="fa-solid fa-trash"></i></button>
        `;
        list.appendChild(li);
    });
}
// edit btn functionality
function editEntry(index) {
    document.getElementById("description").value = entries[index].description;
    document.getElementById("amount").value = entries[index].amount;
    document.getElementById("type").value = entries[index].type;
    editId = index;
}
// delete btn functionality
function deleteEntry(index) {
    entries.splice(index, 1);
    renderEntries();
}
// reset btn functionality
function resetForm() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "income";
    editId = null;
}