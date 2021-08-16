import Centerpiece from './Centerpiece';
import { render, screen} from '@testing-library/react';

describe("Centerpiece", () => {
   it('should create a jumbotron element', () => {
      const component = render(<Centerpiece content={
          {
              title: 'Title Here',
              lead: 'Lead text for the advertisement.',
              body: 'Body of jumbotron should go here here',
              image: '../../images/test.jpg',
              alt: 'Test image',
              buttonText: 'Submit',
              buttonClasses: 'btn-primary',
              clickHandler: (event) => {
                  event.preventDefault();
                  console.log('button clicked');
              }
          }
      }/>);
      const submitButton = screen.getByText('submit');

      expect(component).toBeTruthy();
      expect(submitButton).toBeTruthy();
   });
});