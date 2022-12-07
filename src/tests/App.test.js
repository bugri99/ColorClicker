import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import { powerUps } from "../components/Data";
import App from "../App";

//run cleanup after each test
afterEach(() => cleanup());

test("renders the app and all its components", () => {
  render(<App />);
  const gameWindow = screen.getByTestId("game-window");
  expect(gameWindow).toBeInTheDocument();

  const upgradesWindow = screen.getByTestId("upgrades-window");
  expect(upgradesWindow).toBeInTheDocument();

  const colorValueText = screen.getByTestId("colorvalue-text");
  expect(colorValueText).toBeInTheDocument();

  const multiplierValue = screen.getByTestId("multiplier-value");
  expect(multiplierValue).toBeInTheDocument();

  const machinesText = screen.getByTestId("machines-text");
  expect(machinesText).toBeInTheDocument();

  const machinesAmount = screen.getByTestId("machines-amount");
  expect(machinesAmount).toBeInTheDocument();

  const incomeText = screen.getByTestId("income-text");
  expect(incomeText).toBeInTheDocument();

  const incomeAmount = screen.getByTestId("income-amount");
  expect(incomeAmount).toBeInTheDocument();

  const splitbar = screen.getByTestId("splitbar");
  expect(splitbar).toBeInTheDocument();

  const powerupsContainer = screen.getByTestId("powerups-container");
  expect(powerupsContainer).toBeInTheDocument();

  const levelText = screen.getByTestId("level-text");
  expect(levelText).toBeInTheDocument();

  const xpbar = screen.getByTestId("xpbar");
  expect(xpbar).toBeInTheDocument();

  const xpAmount = screen.getByTestId("xp-amount");
  expect(xpAmount).toBeInTheDocument();
});

test('text content as expected', () => {
    render(<App/>)
  
    const colorValueText = screen.getByTestId("colorvalue-text");
    expect(colorValueText).toHaveTextContent("Farben-Wert:")
  
    const multiplierValue = screen.getByTestId("multiplier-value");
    expect(multiplierValue).toHaveTextContent("x1")
  
    const machinesText = screen.getByTestId("machines-text");
    expect(machinesText).toHaveTextContent("Maschinen:")
  
    const machinesAmount = screen.getByTestId("machines-amount");
    expect(machinesAmount).toHaveTextContent("0")
  
    const incomeText = screen.getByTestId("income-text");
    expect(incomeText).toHaveTextContent("Einkommen:")
  
    const incomeAmount = screen.getByTestId("income-amount");
    expect(incomeAmount).toHaveTextContent("0 $")
  
    const levelText = screen.getByTestId("level-text");
    expect(levelText).toHaveTextContent("Lv: 0")
  
    const xpAmount = screen.getByTestId("xp-amount");
    expect(xpAmount).toHaveTextContent("0/204")
})

test('buttons working properly', () => {
    render(<App/>);

    const multiplierValue = screen.getByTestId("multiplier-value");
    expect(multiplierValue).toHaveTextContent("x1")

    userEvent.click(screen.getByTestId("color-multiplier-plus-button"));

    expect(multiplierValue).toHaveTextContent("x1")
    
    const machinesAmount = screen.getByTestId("machines-amount");
    expect(machinesAmount).toHaveTextContent("0")

    userEvent.click(screen.getByTestId("machines-plus-button"));

    expect(machinesAmount).toHaveTextContent("0")

})

test('circle disappears after click', () => {
    render(<App/>);
    const circle = screen.getByTestId("circle-1");

    userEvent.click(screen.getByTestId("circle-1"));
    
    expect(circle).toHaveStyle({          
        display: "none"
    })
})

test('all 200 circles render properly', () => {
    render(<App/>);

    for (let i = 0; i < 200; i++) {
        const circle = screen.getByTestId(`circle-${i}`);
        expect(circle).not.toBeNull();
    }
})

test('every available power-up gets displayed', () => {
    render(<App/>);
    const powerUpsContainer = screen.getByTestId("powerups-container");
    let ctr = 0;
    for (let i = 0; i < powerUps.length; i++) {
        if(powerUps[i].prerequisites.length === 0) ctr++;
    }
    expect(powerUpsContainer.getElementsByClassName("PowerUp").length).toBe(ctr);
}) 