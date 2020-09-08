module.exports = class GlobalVariables {
    
    getValidToken() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhZmF3aWxtYXJAZ21haWwuY29tIiwidXNlcklkIjoiNWYyYmY1YTA0ZjgyYTUzODMwOWM0Mzc1IiwiaWF0IjoxNTk5Mjc0Mjg3LCJleHAiOjE1OTk0NDcwODd9.TAZVdJloMmmUQ9MLTQaOKN6pTqTpb0921pLz6v8hiiU';
        return 'Bearer ' + token;
    }
}