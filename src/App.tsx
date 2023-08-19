import React, { useState } from 'react';
import { DatePicker } from './lib';

const App = () => {
    const [date, setDate] = useState('01/02/2023')
    const onDateChange = (e: { target: HTMLInputElement }) => {
        setDate(e.target.value)
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-5 pt-5">
                <div className="col-md-8">
                    <h4 className='text-center my-5'>Date Selected : {date}</h4>
                    <DatePicker
                        id="demo"
                        onChange={onDateChange}
                        placeholder="Please select a date..."
                        className='form-control'
                        value={date}
                    />
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={() => setDate('3/30/2093')}>Change date</button>
                        <button className="btn btn-success" onClick={() => setDate('2/22/1023')}>Change date</button>
                        <button className="btn btn-danger" onClick={() => setDate('11/12/2023')}>Change date</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
