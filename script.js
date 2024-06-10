const slots = document.querySelectorAll('.slot');
let parkedVehicles = {};
let totalAmountCollected = 0;

function parkVehicle() {
  const vehicleSize = document.getElementById('vehicleSize').value;
  let slotFound = false;

  slots.forEach(slot => {
    if (!slotFound && !slot.classList.contains('occupied') && 
       (slot.classList.contains(vehicleSize) || slot.classList.contains('large'))) {
      slot.classList.add('occupied');
      slot.textContent += ' - Occupied';
      slot.dataset.parkedAt = Date.now();
      parkedVehicles[slot.id] = vehicleSize;
      slotFound = true;
    }
  });

  if (!slotFound) {
    document.getElementById('message').textContent = 'No available slots for the selected vehicle size.';
  } else {
    document.getElementById('message').textContent = '';
  }
}

function removeVehicle() {
  const slotId = prompt('Enter the slot number to remove the vehicle from (e.g., slot1):');
  const slot = document.getElementById(slotId);

  if (slot && slot.classList.contains('occupied')) {
    const parkedAt = slot.dataset.parkedAt;
    const parkedTimeMinutes = (Date.now() - parkedAt) / 60000; // in minutes
    const baseFee = slot.classList.contains('small') ? 60000 : 100000;
    const extraTime = parkedTimeMinutes > 30 ? (parkedTimeMinutes - 30) / 60 : 0;
    const extraFee = Math.ceil(extraTime) * 15000;
    const totalFee = baseFee + extraFee;

    totalAmountCollected += totalFee;
    document.getElementById('totalAmount').textContent = totalAmountCollected.toLocaleString();

    document.getElementById('message').textContent = `Vehicle removed from ${slotId}. Total parking fee is: ${totalFee.toLocaleString()}.`;

    slot.classList.remove('occupied');
    slot.textContent = slot.textContent.replace(' - Occupied', '');
    delete parkedVehicles[slot.id];
  } else {
    document.getElementById('message').textContent = 'Invalid slot number or slot is not occupied.';
  }
}
