import React from 'react';
import McqInterviewList from '../_components/McqInterviewList';

function mcqhistory() {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Previous MCQ Interviews</h1>
            <McqInterviewList/>
        </div>
    );
}

export default mcqhistory;