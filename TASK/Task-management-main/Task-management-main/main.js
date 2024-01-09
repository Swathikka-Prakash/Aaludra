const inputbox = document.getElementById('input-box');
    const listContainer = document.getElementById('list-details');
    const taskTableBody = document.getElementById('taskTableBody');

    function addTask() {
        if (inputbox.value === "") {
            alert('Write something; it should not be empty');
        }
         else {
            const reminderTimeInput = document.getElementById('reminderTime');
            const reminderTime = reminderTimeInput.value;

             // Check if the date is entered
        if (!reminderTime) {
            alert('Please enter date and time to reminder.');
            return;
        }
            // Create a new row in the table
            let newRow = taskTableBody.insertRow();
            
            // Insert task data into the table cells
            let cell1 = newRow.insertCell(0);
            cell1.innerHTML = inputbox.value;

            let cell2 = newRow.insertCell(1);
            cell2.innerHTML = reminderTime;
            
            let cell3 = newRow.insertCell(2);
            cell3.innerText = 'Started';

            let cell4 = newRow.insertCell(3);
            cell4.innerHTML = '<button onclick="TaskStatus(this)" id="del_btn">Delete</button>';

            setReminder(reminderTime, newRow);

            // Clear input values
            inputbox.value = "";
            reminderTimeInput.value = "";

            saveData();
        }
    }

    function TaskStatus(button) {
        
        // Delete the row associated with the clicked delete button
        let row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
        saveData();
    }

    function setReminder(reminderTime, row) {
        const taskReminderTime = new Date(reminderTime).getTime();
        const currentTime = new Date().getTime();
        const difference = taskReminderTime - currentTime;
        var message = inputbox.value + '\nTask Reminder';

         if (difference > 0) {
            setTimeout(function () {
                alert(message);
                // Update status to 'Completed' when time is over
                row.cells[2].innerText = 'Completed';
                saveData();
            }, difference);
        } else if (difference < 0) {
            // Time is in the past, update status to 'task time over'
            row.cells[2].innerText = 'Task time Over';
            saveData();
        } else {
            // Time is now, update status to 'Completed'
            row.cells[2].innerText = 'Completed';
            saveData();
        }
    }

    function saveData() {
        localStorage.setItem('data', taskTableBody.innerHTML);
    }

    function showData() {
        taskTableBody.innerHTML = localStorage.getItem('data');
    }

    showData();