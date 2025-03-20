import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-receivingform',
  imports: [CommonModule],
  templateUrl: './receivingform.component.html',
  styleUrl: './receivingform.component.css'
})
export class ReceivingformComponent {
  currentDate:string='';
  currentPage: number = 1;
  rowsPerPage: number = 10;
  totalRows: number= 0;
  constructor(){
    this.currentDate=new Date().toISOString().split('T')[0];
  }



  moveToNext(event: any) {
    event.preventDefault(); // Prevent default Enter key behavior

  const inputs = Array.from(document.querySelectorAll<HTMLElement>('.field'));
  const index = inputs.indexOf(event.target as HTMLElement);

  if (index !== -1 && index < inputs.length - 1) {
    inputs[index + 1].focus();
  } else if (index === inputs.length - 1) {
    // After the last button, go back to the first field
    inputs[0].focus();
  }
}
showSuccessPopup(event: any) {
  if (event.key === 'Enter') {
    const toaster = document.getElementById('toaster');
    if (toaster) {
      toaster.style.display = 'block';
    }
  }
  this.moveToNext(event);
  
}

hideToaster() {
  const toaster = document.getElementById('toaster');
  if (toaster) {
    toaster.style.display = 'none';
  }
}




resetFields(event: any) {
  this.hideToaster();
  event.preventDefault();
  

  // Get all input and select fields and clear their values
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('.field'));
  inputs.forEach(input => {
    if (input.tagName === 'SELECT') {
      (input as HTMLSelectElement).selectedIndex = 0; // Reset select to the first option
    } else if (input.type === 'text' || input.type === 'date') {
      input.value = ''; // Clear text and date inputs
    }
  });

  this.moveToNext(event);  // Move to the next field after resetting
}

  

  ngOnInit() {
    this.updateTotalRows();
    this.showPage(this.currentPage);
  }
  updateTotalRows() {
    this.totalRows = document.querySelectorAll('#tableBody tr').length;
  }

  showPage(page: number): void {
    const rows = Array.from(document.querySelectorAll('#tableBody tr')) as HTMLElement[];
    const start = (page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;

    rows.forEach((row, index) => {
      (row as HTMLElement).style.display = index >= start && index < end ? '' : 'none';
    });
    this.updateButtonState();
  }

  nextPage() {
    if ((this.currentPage * this.rowsPerPage) < this.totalRows) {
      this.currentPage++;
      this.showPage(this.currentPage);
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.showPage(this.currentPage);
    }
  }
  updateButtonState() {
    const nextButton = document.querySelector('.nav-btn:last-child') as HTMLButtonElement | null;
    if (nextButton) {
      nextButton.disabled = this.currentPage * this.rowsPerPage >= this.totalRows;
    }
  }

 
}
  

