import {Component, OnInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {AuthService} from '~/app/shared/auth.service';
import {DataService} from '~/app/shared/data.service';
import {ApiService} from "~/app/shared/api.service";
import {Page} from '@nativescript/core/ui/page/page';
import { alert } from '@nativescript/core/ui/dialogs';
import {localize} from 'nativescript-localize';
import * as applicationSettings from '@nativescript/core/application-settings';
import * as purchase from 'nativescript-purchase';
import { Transaction, TransactionState } from 'nativescript-purchase/transaction';
import { Product } from 'nativescript-purchase/product';
(global as any).purchaseInitPromise = purchase.init([
    'com.boatofficer.boatofficermobile.abo.month', 'com.boatofficer.boatofficermobile.abo.year',
    // 'com.boatofficer.boatofficermobile.single.month', 'com.boatofficer.boatofficermobile.single.year'
]);
(global as any).purchaseInitPromise.then(() => {
    console.log('Receiving products...');
    purchase.getProducts().then((products: Array<Product>) => {
        console.log(products.length + ' products received');
        products.forEach((product: Product) => {
            console.log(product.productIdentifier);
            console.log(product.localizedTitle);
            console.log(product.priceFormatted);
        });
    });
});
import {Observable} from "rxjs";




@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    moduleId: module.id
})

export class PurchaseComponent implements OnInit {
    isLoading = false;
    items: Product[];
    viewModel: Observable<{items: [], loading: true}>;

    constructor(
        private page: Page,
        private authService: AuthService,
        private router: RouterExtensions,
        private dataService: DataService,
        private apiService: ApiService,
    ) {
        purchase.init([
            'com.boatofficer.boatofficermobile.abo.month', 'com.boatofficer.boatofficermobile.abo.year',
            // 'com.boatofficer.boatofficermobile.single.month', 'com.boatofficer.boatofficermobile.single.year'
        ]);
        purchase.on(purchase.transactionUpdatedEvent, (transaction: Transaction) => {
            let originalTransaction = transaction;
            if (transaction.transactionState === TransactionState.Purchased) {
                // alert(`Congratulations you just bought ${transaction.productIdentifier}!`);
                console.log(transaction.transactionDate);
                console.log(transaction.transactionIdentifier);
                applicationSettings.setBoolean(transaction.productIdentifier, true);
            } else if (transaction.transactionState === TransactionState.Restored) {
                originalTransaction = transaction.originalTransaction;
                console.log(`Purchase of ${transaction.originalTransaction.productIdentifier} restored.`);
                console.log(transaction.originalTransaction);
                console.log(transaction.originalTransaction.transactionDate);
                applicationSettings.setBoolean(transaction.originalTransaction.productIdentifier, true);
            } else if (transaction.transactionState === TransactionState.Failed) {
                // alert(`Purchase of ${transaction.transactionIdentifier} failed!`);
            }
            if (transaction.transactionState === TransactionState.Purchased || transaction.transactionState === TransactionState.Restored) {
                let period = 0;
                if (originalTransaction.productIdentifier.split('.')[4]) {
                    switch (originalTransaction.productIdentifier.split('.')[4]) {
                        case 'month':
                            period = 31;
                            break;
                        case 'year':
                            period = 365;
                            break;
                    }
                } else {
                    switch (originalTransaction.productIdentifier.split('.')[3]) {
                        case 'product1':
                            period = 31;
                            break;
                        case 'product2':
                            period = 365;
                            break;
                    }
                }
                let recurring = false;
                switch (originalTransaction.productIdentifier.split('.')[3]) {
                    case 'abo':
                        recurring = true;
                        break;
                    case 'single':
                        recurring = false;
                        break;
                    case 'product1':
                        recurring = false;
                        break;
                    case 'product2':
                        recurring = false;
                        break;
                }
                let transactionDate = originalTransaction.transactionDate
                apiService.savePurchase(originalTransaction.productIdentifier, transactionDate, period, recurring).subscribe(
                    () => {

                    }
                );
            }
        });

        purchase.getProducts()
        .then((res: Array<Product>) => {
            console.log(res.length + ' Products loaded');
            this.items = res;
            this.isLoading = false;
        })
        .catch((e) => console.log(e));

    }

    ngOnInit() {
    }
    // scanBarcode() {
    //     new BarcodeScanner().scan({});
    // }

    // onProductTap(data: ItemEventData) {
    //     const product = this.items[data.index] as Product;
    //
    //     purchase.buyProduct(product);
    // }

    onRestoreTap() {
        purchase.restorePurchases();
    }

    saveForm(product: Product) {
        this.isLoading = true;
        console.log('Order: ' + product.localizedTitle);
        if (purchase.canMakePayments()) {
            // NOTE: 'product' must be the same instance as the one returned from getProducts()
            purchase.buyProduct(product);
        } else {
            alert('Sorry, your account is not eligible to make payments!');
        }
        this.isLoading = false;
    }

    goBack() {
        this.router.backToPreviousPage();
    }
}
