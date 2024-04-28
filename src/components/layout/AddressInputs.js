export default function AddressInputs({addressProps,setAddressProps,disabled=false}) {
    const {phone,street,pCode,city,country} = addressProps;
    return (
        <>
            <label>Phone number</label>
            <input type="tel" placeholder="Phone number" disabled={disabled}
                value={phone || ''} onChange={e => setAddressProps('phone',e.target.value)} />

            <label>Street Address</label>
            <input type="text" placeholder="Street address" disabled={disabled}
                value={street || ''} onChange={e => setAddressProps('street',e.target.value)} />

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label>Postal Code</label>
                    <input type="text" placeholder="Postal Code" style={{ 'marginTop': '0' }} disabled={disabled}
                        value={pCode || ''} onChange={e => setAddressProps('pCode',e.target.value)} />
                </div>
                <div>
                    <label>City</label>
                    <input type="text" placeholder="City" style={{ 'marginTop': '0' }} disabled={disabled}
                        value={city || ''} onChange={e => setAddressProps('city',e.target.value)} />
                </div>
            </div>

            <label>Country</label>
            <input type="text" placeholder="Country" disabled={disabled}
                value={country || ''} onChange={e => setAddressProps('country',e.target.value)} />
        </>
    );
}