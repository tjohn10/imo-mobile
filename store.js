import { registerInDevtools, Store} from "pullstate";


export const TicketStore = new Store({
    ticketType: '',
    plateNo: '',
    phoneNumber: '',
    amount: '',
    vehicleInfo: {},
    email: '',
    name: '',
    nextPayment: '',
    paymentDescription: '',
    paymentPeriod: '',
    paymentMethod: '',
    invoiceId: ''
})
export const MarketStore = new Store({
    marketName: '',
    email: '',
    zone: '',
    shopNumber: '',
    businessType: '',
    shopCategory: '',
    revenueItem: '',
    paymentPeriod: '',
    paymentMethod: '',
    phone: '',
    name: '',
    amount: ''
})

export const TransportEnumerationStore = new Store({
    vehicleCategory: '',
    taxpayer_category: '',
    selectedLGA: '',
    revenueYear: '',
    plateNo: '',
    abssin: '',
    name: '',
    union: '',
    registrationExpiry: '',
    paymentMethod: '',
    enumFee: '',
    dailyAmount: '',
    walletBalance: '',
    ownerName: '',
    ownerAddress: '',
    vehicleType: '',
    lga: '',
    errorText: '',
    parks: '',
})
export const MarketEnumStore = new Store({
    category: '',
    availability: '',
    abssin: '',
    ownerName: '',
    ownerPhone: '',
    ownerAddress: '',
    registrationExpiry: '',
    location: '',
    year: '',
    shopCategory: '',
    zone: '',
    market: '',
    shopNumber: '',
    income: '',
    ownerAmount: '',
    occupantAmount: '',
    enumFee: '',
    paymentMethod: '',
})
export const AuthStore = new Store({
    token: '',
    message: '',
    userCat: '',
    lga: '',
    name: '',
    phone: '',
    email: ''
})
export const TransportStore = new Store({
    emblemType: '',
    plateNo: '',
    phoneNumber: '',
    email: '',
    emblemPrice: '',
    vehicleInfo: {},
    name: '',
    paymentDescription: '',
    paymentPeriod: '',
    paymentMethod: '',
})
export const AbssinStore = new Store({
    coy_name: '',
    regist_name: '',
    companyTin: '',
    rcno: '',
    enterprise_reg_no: '',
    category: '',
    mobile_no: '',
    e_mail: '',
    city: '',
    type_of_organisation: '',
    line_of_business: '',
    date_of_incorporation: '',
    sector: '',
    phone_no: '',
    house_no: '',
    street: '',
    lga: 0,
    ward: '',
    state: '',
    date_of_commencement: '',
    tax_office: '',
    cdn_category_id: 0,
    password: '',
    enter_by: ''
})
export const WalletStore = new Store({
    walletBalance: '',
    id: '',
    currentEarnings: '',
    name: '',
    totalCollection: ''
})
export const ILIDStore = new Store({
    phoneNumber:'',
    email:'',
    title:'',
    firstName:'',
    middleName:'',
    lastName:'',
    maritalStatus:''
})
export const ConcessionStore = new Store({
    penalty:'',
    tonnage:'',
    vehicleContent:'',
    collectionPoint: '',
    plateNumber:'',
    totalNumber: '',
    name:'',
    amount:'',
    phone:'',
    paymentMethod:'',
    paymentPeriod: ''
})

export const ValidateStore = new Store ({
    source:'',
    id:''
})
registerInDevtools({
    TicketStore,
    TransportStore,
    AbssinStore,
    MarketEnumStore,
    ILIDStore,
    ValidateStore,
    MarketStore,
    TransportEnumerationStore,
    WalletStore,
    ConcessionStore,
    AuthStore
})
