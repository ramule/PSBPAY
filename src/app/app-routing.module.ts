import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './services/authenticated.guard.service';
// var value ='STATUS=00|PRN=BAJAJ1010101010|NAR=NA|BID=1234567|AMT=2.00|Accountnumber=03601000021836|Checksum=10293054'
// var value ='encData=//5UbwMez6DU8GXhMa2jiliVl7XbQnuGMziDcGl2O4Jl8/mT98XeiX1f7d8U1A37YjXyYIJAx1pwnHT0KC07NxfE+dS2xuVCAr7OxGYqLrg7QNzQqx80JsF5CIkkYaDMVYnghipQ+kWKHREXLxztM984dbNMv6MtHxP+jYlQDNIGdkk4ZuvO0i8dT+o5GuVNZuv68wW9MvCOEumcSNdZUZOR7pI9ALKhJxzc91ZVmNzuMCUfSGmzwHgTBFH9X/c9IPLgn51zj8nJ6VL0YPmRAfal+wYIc14xflYXy6hFVFydHC4tvhmKGgbfR8O/0z/H/Gve+Z6R3ilxojkq6DWoYgn8MzNPVufa3iJzmtrKNyDYOckwDeFjwoI10pxQlq1Z'
// var value = 'MerchantName=ATOM&refNo=f51e0a49-4f1b-4329-acff-82eab6e7fda0';
// var value = 'MerchantName=ATOM&refNo=76427ec1-02de-4a65-87e2-db154e036c49';
//var value = 'MerchantName=GSTN&refNo=5323ee99-8bhh-4bcc-900e-0cac466b3c03';
// var value = "MerchantName=BILLDESK&refNo=f4c1e1db-70f5-4132-989b-07ee8d6fa31f";
// oltas 280
// var value = 'oltasForm=280&oltasData=R2%3Dnull&Add_Line3=&ChallanNo=280&Add_Line2=&ZAOCODE=722008&Add_Line5=MUMBAI&Add_Line4=&flag_var=true&MinorIndex=null&MinorHead=100&Name=AKSXXXXGDHDGDFDFDGSVSRSGS%20QWERTYUIOPASDFGHJKLZXCVBN%20AHSDKBCTDHDKDGDJDHDKDHD&Add_PIN=410210&valid=&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&Add_State=PUNJAB&AssessYear=2022-23&PAN=AAAPA0006P&Add_Line1=&TransactionDate=25102021&radioIndex=null';

// oltas 281
// var value = 'oltasForm=281&oltasData=R2=null&TAN=HYDM12664B&Add_Line3=&ChallanNo=281&Add_Line2=&ZAOCODE=722008&Add_Line5=mumbai&Add_Line4=&flag_var=true&MinorHead=200&NaturePayment=193&Name=MANXXXX%20KOORAPATI&Add_PIN=410210&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&AssessYear=2022-23&Add_State=MAHARASHTRA&Add_Line1=&radioIndex=null&TransactionDate=28102021';

// oltas 282
// var value = 'oltasForm=282&oltasData=R2%3Dnull&Add_Line3=&ChallanNo=282&Add_Line2=&ZAOCODE=722008&Add_Line5=MUMBAI&MinorIndex=null&Add_Line4=&flag_var=true&MinorHead=300&Name=AKAXXXXEP%20ENTERPRISES&Add_PIN=410210&FinancialYear=2021-22&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0034&AssessYear=&Add_State=MAHARASHTRA&PAN=AAAFA0307J&Add_Line1=&radioIndex=null&TransactionDate=28102021';

// oltas 283
// var value = 'oltasForm=283&oltasData=R2%3Dnull&Add_Line3=&ChallanNo=283&Add_Line2=&ZAOCODE=722008&Add_Line5=MUMBAI&MinorIndex=null&Add_Line4=&flag_var=true&MinorHead=300&Name=AKAXXXXEP%20ENTERPRISES&Add_PIN=410210&FinancialYear=2008-09&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0036&AssessYear=&Add_State=MAHARASHTRA&PAN=AAAFA0307J&Add_Line1=&radioIndex=null&TransactionDate=28102021';

// oltas 284
// var value = 'oltasForm=284&oltasData=R2%3Dnull&Add_Line3=JV%20Link%20Road&ChallanNo=284&Add_Line2=dsdsad&ZAOCODE=722008&Add_Line5=mumbai&MinorIndex=null&Add_Line4=sdasd&flag_var=true&MinorHead=108&Name=AKAXXXXEP%20ENTERPRISES&valid=&Add_PIN=400093&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&AssessYear=2020-21&Add_State=MAHARASHTRA&PAN=AAAFA0307J&Add_Line1=asdsd&radioIndex=null&TransactionDate=28102021';

// oltas 285
//  var value = 'oltasForm=285&oltasData=285&Add_Line3=12&ChallanNo=285&R2=&Add_Line2=11&ZAOCODE=722008&Add_Line5=EAE0001245_L01&Add_Line4=15&MinorIndex=&flag_var=true&MinorHead=119&Name=ARUX%20XXXMERCIAL%20PREMISES%20COOPERATIVE%20SOCIETY%20LIMITED&valid=&Add_PIN=414502&FinancialYear=2020-21&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0045&Add_State=MAHARASHTRA&PAN=AAABA0137A&Add_Line1=10&radioIndex=&TransactionDate=26112021';

// oltas 286
// var value = 'oltasForm=286&oltasData=R2%3D&Add_Line3=MG%20Marg&ChallanNo=286&Add_Line2=horizon&ZAOCODE=722008&Add_Line5=Mumbai&Add_Line4=O&flag_var=true&MinorIndex=null&MinorHead=111&Name=AKAXXXXEP%20ENTERPRISES&Add_PIN=400063&valid=&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0028&Add_State=MAHARASHTRA&AssessYear=2017-18&PAN=AAAFA0307J&Add_Line1=203&TransactionDate=30102021&radioIndex=null';

// oltas 26QB
// var value = 'oltasForm=280&oltasData=R2%3Dnull&Add_Line3=AAABA0137A&ChallanNo=280&Add_Line2=09052016&ZAOCODE=722008&Add_Line5=Mumbai&Add_Line4=AD0001676&flag_var=true&MinorIndex=null&MinorHead=800&Name=SMT%20XXXXHYADEVI%20KARWA%20MEMORIAL%20TRUST&Add_PIN=400063&valid=&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&AssessYear=2017-18&Add_State=MAHARASHTRA&PAN=AAATA0104H&Add_Line1=150000&TransactionDate=01112021&radioIndex=null';

// oltas 26QB
// var value = 'oltasForm=280&oltasData=R2%3Dnull&Add_Line3=AHLPT1744N&ChallanNo=280&Add_Line2=01092021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=AI0000840&flag_var=true&MinorIndex=null&MinorHead=800&Name=MANXXXX%20ABC%20SHARMA&Add_PIN=110085&valid=&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&AssessYear=2022-23&Add_State=DELHI&PAN=GWFPS0122G&Add_Line1=1500000&TransactionDate=16112021&radioIndex=null'

// oltas 26QB Demand Payment
//var value = 'oltasForm=280&oltasData=Add_Line3=AHLPT1744N&ChallanNo=280&R2=null&Add_Line2=01092021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=AI0000836&flag_var=true&MinorIndex=null&MinorHead=800&Name=MANXXXX%20ABC%20SHARMA&Add_PIN=110085&valid=&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&AssessYear=2022-23&Add_State=DELHI&PAN=GWFPS0122G&Add_Line1=DEMAND%20PAYMENT&TransactionDate=16112021&radioIndex=null';
// var value = 'oltasForm=280&oltasData=280&Add_Line3=AKUPM0550B&ChallanNo=280&R2=null&Add_Line2=01102021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=AI0000851&flag_var=true&MinorIndex=null&MinorHead=800&Name=ANSXX%20XXC%20THAKUR&Add_PIN=110085&valid=&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&AssessYear=2022-23&Add_State=DELHI&PAN=AHLPT1744N&Add_Line1=DEMAND%20PAYMENT&TransactionDate=26112021&radioIndex=null';
// oltas 26QC
//var value = 'oltasForm=280&oltasData=R2%3Dnull&Add_Line3=AHLPT1744N&ChallanNo=280&Add_Line2=01102021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=RAE0000453&flag_var=true&MinorIndex=null&MinorHead=800&Name=MANXXXX%20ABC%20SHARMA&Add_PIN=110085&valid=&FinancialYear=2021-22&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&Add_State=DELHI&PAN=GWFPS0122G&Add_Line1=100000&TransactionDate=16112021&radioIndex=null';

// oltas 26QC Demand Payment
// var value = 'oltasForm=280&oltasData=Add_Line3%3DAHLPT1744N&ChallanNo=280&R2=null&Add_Line2=01102021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=RAE0000453&flag_var=true&MinorIndex=null&MinorHead=800&Name=MANXXXX%20ABC%20SHARMA&Add_PIN=110085&valid=&FinancialYear=2021-22&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&Add_State=DELHI&PAN=GWFPS0122G&Add_Line1=DEMAND%20PAYMENT&TransactionDate=16112021&radioIndex=null'
// var value = 'oltasForm=280&oltasData=280&Add_Line3=AKUPM0550B&ChallanNo=280&R2=null&Add_Line2=01112021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=RAE0000464&flag_var=true&MinorIndex=null&MinorHead=800&Name=ANSXX%20XXC%20THAKUR&Add_PIN=110085&valid=&FinancialYear=2021-22&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&Add_State=DELHI&PAN=AHLPT1744N&Add_Line1=DEMAND%20PAYMENT&TransactionDate=26112021&radioIndex=null';
// oltas 26QD
// var value = 'oltasForm=280&oltasData=R2%3Dnull&Add_Line3=AHLPT1744N&ChallanNo=280&Add_Line2=01112021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=DAC0000103&flag_var=true&MinorIndex=null&MinorHead=800&Name=MANXXXX%20ABC%20SHARMA&Add_PIN=110085&valid=&FinancialYear=2021-22&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&Add_State=DELHI&PAN=GWFPS0122G&Add_Line1=200000&TransactionDate=16112021&radioIndex=null'

// oltas 26QD Demand Payment
//var value = 'oltasForm=280&oltasData=Add_Line3%3DAHLPT1744N&ChallanNo=280&R2=null&Add_Line2=01112021&ZAOCODE=722008&Add_Line5=DELHI&Add_Line4=DAC0000103&flag_var=true&MinorIndex=null&MinorHead=800&Name=MANXXXX%20ABC%20SHARMA&Add_PIN=110085&valid=&FinancialYear=2021-22&BankName_c=Punjab%20and%20Sind%20Bank&MajorHead=0021&Add_State=DELHI&PAN=GWFPS0122G&Add_Line1=DEMAND%20PAYMENT&TransactionDate=16112021&radioIndex=null'

//NOTE: Below value should be blank in for the final production build
var value = '';

 var route = '/login?'+decodeURIComponent(value)
//var route = '/login';

const routes: Routes = [
  { path: '', redirectTo: route, pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../app/pages/pre-login/login/login.module').then(m => m.LoginModule)},

  // direct tax
  { path: 'directTaxPayment', loadChildren: () => import('../app/pages/aggregators/direct-tax/direct-tax-payment/direct-tax-payment.module').then(m => m.DirectTaxPaymentModule),canActivate:[AuthenticatedGuard] },
  { path: 'directTaxPaymentOverview', loadChildren: () => import('../app/pages/aggregators/direct-tax/direct-tax-payment-overview/direct-tax-payment-overview.module').then(m => m.DirectTaxPaymentOverviewModule),canActivate:[AuthenticatedGuard] },
  { path: 'directTaxPaymentOtpAuth', loadChildren: () => import('../app/pages/aggregators/direct-tax/direct-tax-payment-otp-authorization/direct-tax-payment-otp-authorization.module').then(m => m.DirectTaxPaymentOtpAuthorizationModule),canActivate:[AuthenticatedGuard] },
  { path: 'directTaxPaymentTpinAuth', loadChildren: () => import('../app/pages/aggregators/direct-tax/direct-tax-payment-tpin-authorization/direct-tax-payment-tpin-authorization.module').then(m => m.DirectTaxPaymentTpinAuthorizationModule),canActivate:[AuthenticatedGuard] },
  { path: 'directTaxPaymentReceipt', loadChildren: () => import('../app/pages/aggregators/direct-tax/direct-tax-receipt/direct-tax-receipt.module').then(m => m.DirectTaxReceiptModule),canActivate:[AuthenticatedGuard] },

  // payment : bill desk type design
  { path: 'agreePayment', loadChildren: () => import('../app/pages/aggregators/payment/aggre-payment/aggre-payment.module').then(m => m.AggrePaymentModule),canActivate:[AuthenticatedGuard] },
  { path: 'agreePaymentOverview', loadChildren: () => import('../app/pages/aggregators/payment/aggre-payment-overview/aggre-payment-overview.module').then(m => m.AggrePaymentOverviewModule),canActivate:[AuthenticatedGuard] },
  { path: 'agreePaymentOtpAuth', loadChildren: () => import('../app/pages/aggregators/payment/aggre-payment-otp-auth/aggre-payment-otp-auth.module').then(m => m.AggrePaymentOtpAuthModule),canActivate:[AuthenticatedGuard] },
  { path: 'agreePaymentTpinAuth', loadChildren: () => import('../app/pages/aggregators/payment/aggre-payment-tpin-auth/aggre-payment-tpin-auth.module').then(m => m.AggrePaymentTpinAuthModule),canActivate:[AuthenticatedGuard] },
  { path: 'agreePaymentReceipt', loadChildren: () => import('../app/pages/aggregators/payment/aggre-payment-receipt/aggre-payment-receipt.module').then(m => m.AggrePaymentReceiptModule),canActivate:[AuthenticatedGuard] },

  // Challan Payment : OLTAS
  { path: 'challanTaxPayment', loadChildren: () => import('../app/pages/aggregators/challan-payment/challan-tax-payment/challan-tax-payment.module').then(m => m.ChallanTaxPaymentModule),canActivate:[AuthenticatedGuard] },
  { path: 'challanPaymentOverview', loadChildren: () => import('../app/pages/aggregators/challan-payment/challan-payment-overview/challan-payment-overview.module').then(m => m.ChallanPaymentOverviewModule),canActivate:[AuthenticatedGuard] },
  { path: 'challanPaymentAuth', loadChildren: () => import('../app/pages/aggregators/challan-payment/challan-payment-authorization/challan-payment-authorization.module').then(m => m.ChallanPaymentAuthorizationModule),canActivate:[AuthenticatedGuard] },
  { path: 'challanPaymentSuccess', loadChildren: () => import('../app/pages/aggregators/challan-payment/challan-payment-success/challan-payment-success.module').then(m => m.ChallanPaymentSuccessModule),canActivate:[AuthenticatedGuard] },

  // GSTN
  { path: 'gstnPayment', loadChildren: () => import('../app/pages/aggregators/gstn-payment/gstn-payment/gstn-payment.module').then(m => m.GstnPaymentModule),canActivate:[AuthenticatedGuard] },
  { path: 'gstnPaymentOverview', loadChildren: () => import('../app/pages/aggregators/gstn-payment/gstn-payment-overview/gstn-payment-overview.module').then(m => m.GstnPaymentOverviewModule),canActivate:[AuthenticatedGuard] },
  { path: 'gstnPaymentAuth', loadChildren: () => import('../app/pages/aggregators/gstn-payment/gstn-payment-auth/gstn-payment-auth.module').then(m => m.GstnPaymentAuthModule),canActivate:[AuthenticatedGuard] },
  { path: 'gstnPaymentSuccess', loadChildren: () => import('../app/pages/aggregators/gstn-payment/gstn-payment-success/gstn-payment-success.module').then(m => m.GstnPaymentSuccessModule),canActivate:[AuthenticatedGuard] },

  // Session timeout
  { path: 'sessionTimeout', loadChildren: () => import('../app/pages/pre-login/session-timeout/session-timeout.module').then(m => m.SessionTimeoutModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
