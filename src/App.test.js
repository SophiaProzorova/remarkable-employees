import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from './App';
import Form from './Components/Form';

describe('testing App', ()=>{
  it('renders no form', ()=>{
    render (<App />);
    expect(screen.queryByRole('form')).toBeNull();
  })
  it('renders form on click button', async ()=>{
    render (< App />);
    const newEmployerButton = screen.getByRole('button');
    userEvent.click(newEmployerButton);
    await expect(screen.getByRole('form')).toBeInTheDocument();
  })
  it('submit null values', ()=>{
   const {container} = render (< App />);
   const newEmployerButton = screen.getByRole('button');
   userEvent.click(newEmployerButton);
   const submitButton = screen.getByRole('button', {id:'submitForm'});
   userEvent.click(submitButton);
   expect(screen.queryByRole('form')).toBeInTheDocument();
  })

  it('App without form snapshot', ()=>{
    const {app} = render(<App />);
    expect(app).toMatchSnapshot();
  })
  it('App with form snapshot', ()=>{
    const {app} = render(<App />);
    const newEmployerButton = screen.getByRole('button');
    userEvent.click(newEmployerButton);
    expect(app).toMatchSnapshot();
  })


})
