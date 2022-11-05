const formatHTML = require('../index');
let inputHTML = `
<div style="width: 100%">
<div style="display: flex">
<img src="../../../assets/images/icons/spaceName.svg" alt="" />
<input
[(ngModel)]="first"
[ngModelOptions]="{ standalone: true }"
type="text"
placeholder="Parent First Name"
required
#first_name="ngModel"
/>
</div>
<div
*ngIf="
first_name.invalid && (first_name.dirty || first_name.touched)
"
class="alert alert-danger"
>
<div class="errMsg" *ngIf="first_name.errors.required">
First Name is required.
</div>
</div>
</div>
`;

let expectedFormatting = `<div style="width: 100%">
    <div style="display: flex">
        <img src="../../../assets/images/icons/spaceName.svg" alt="" />
        <input [(ngModel)]="first" [ngModelOptions]="{ standalone: true }" type="text" placeholder="Parent First Name" required #first_name="ngModel" />
    </div>
    <div *ngIf=" first_name.invalid && (first_name.dirty || first_name.touched) " class="alert alert-danger" >
        <div class="errMsg" *ngIf="first_name.errors.required">
             First Name is required. 
        </div>
    </div>
</div>
`;

test("get formatted HTML", () => {
    expect(formatHTML(4, inputHTML)).toBe(expectedFormatting);
})