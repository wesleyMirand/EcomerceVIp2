import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index from '../pages/index';

describe("Index page", () => {
    it("should render", () => {
        render(<Index />);
        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();
    });
});
