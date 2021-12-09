import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Table from './Table'

describe('renders a table', ()=>{

    it('render a table with props', ()=>{
        const data =[
            {
                "name": "Jesse Karl",
                "jobTitle": "Developer",
                "tenure": "3",
                "gender": "Male"
              },
              {
                "name": "Kelly Turner",
                "jobTitle": "QA",
                "tenure": "8",
                "gender": "Female"
              }
        ]

        render(< Table values = {data} />);
        expect(screen.getAllByRole('row')[1]).toHaveTextContent("Kelly Turner");
    });

    it('sort column on click', ()=>{
        const data =[
            {
                "name": "Kelly Turner",
                "jobTitle": "QA",
                "tenure": "8",
                "gender": "Female"
            },
            {
                "name": "Jesse Karl",
                "jobTitle": "Developer",
                "tenure": "3",
                "gender": "Male"
              }
        ]

        render(< Table values = {data} />);
        expect(screen.getAllByRole('row')[2]).toHaveTextContent("QA");
        const column = screen.getByText(/job title/i);
        userEvent.click(column);
        expect(screen.getAllByRole('row')[1]).toHaveTextContent("Developer");
    });

    it('Table snapshot', ()=>{
        const data =[
            {
                "name": "Kelly Turner",
                "jobTitle": "QA",
                "tenure": "8",
                "gender": "Female"
            },
            {
                "name": "Jesse Karl",
                "jobTitle": "Developer",
                "tenure": "3",
                "gender": "Male"
              }
        ]
        const table = render (<Table values={data} />)
        expect(table).toMatchSnapshot();
    })
})