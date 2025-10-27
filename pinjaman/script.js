function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const loanTerm = parseInt(document.getElementById("loanTerm").value);

    if (!loanAmount || !interestRate || !loanTerm) {
        document.getElementById("result").innerText = "Mohon isi semua data!";
        return;
    }

    const monthlyRate = (interestRate / 100) / 12;

    const monthlyPayment = loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1);

    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    // document.getElementById("result").innerHTML = `
    //     Cicilan per bulan: Rp ${monthlyPayment.toLocaleString('id-ID')} <br>
    //     Total Bunga: Rp ${totalInterest.toLocaleString('id-ID')} <br>
    //     Total Pembayaran: Rp ${totalPayment.toLocaleString('id-ID')}
    // `;

    document.getElementById("monthlyPayment").innerHTML = `Cicilan per bulan: Rp ${monthlyPayment.toLocaleString('id-ID')}`;
    document.getElementById("totalPayment").innerHTML = `Total Pembayaran: Rp ${totalPayment.toLocaleString('id-ID')}`;
    document.getElementById("totalInterest").innerHTML = `Total Bunga: Rp ${totalInterest.toLocaleString('id-ID')}`;
}