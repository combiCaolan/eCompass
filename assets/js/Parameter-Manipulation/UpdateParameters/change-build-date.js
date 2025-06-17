import { UpdateFactoryValue } from "./update-parameters";

/**
 * Utility functions to update build, dealer, and customer dates.
 * Converts date input to epoch seconds and updates corresponding values.
 */

export function ChangeBuildDate() {
    const input = document.getElementById('UpdateBuildDate');
    if (input && input.value !== "") {
        const epochTime = Math.floor(new Date(input.value).getTime() / 1000);
        UpdateFactoryValue('5', epochTime.toString());
        alert('Updated Build Date');
    } else {
        alert("Please choose a build date for the truck.");
    }
}

export function ChangeDealerDate() {
    const input = document.getElementById('UpdateDealerDate');
    if (input && input.value !== "") {
        const epochTime = Math.floor(new Date(input.value).getTime() / 1000);
        UpdateMinValue('5', epochTime.toString());
        alert('Updated Dealer Date');
    } else {
        alert("Please choose a dealer date for the truck.");
    }
}

export function ChangeCustomerDate() {
    const input = document.getElementById('UpdateCustomerDate');
    if (input && input.value !== "") {
        const epochTime = Math.floor(new Date(input.value).getTime() / 1000);
        UpdateMaxValue('5', epochTime.toString());
        alert('Updated Customer Date');
    } else {
        alert("Please choose a customer date for the truck.");
    }
}