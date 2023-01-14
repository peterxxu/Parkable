import { render, fireEvent, getByTestId } from "@testing-library/react";
import Card from "./Card";
import ErrorPage from "./ErrorPage";
import Marker from "./Marker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";
import { MemoryRouter } from "react-router-dom";

test("rendering menu button", () => {
  const renderedComponent = render(
    <button
      type="button"
      id="menu"
      data-testid="menu-button"
      onClick={() => {
        setIsModalOpen(!isModalOpen);
      }}
    >
      Menu
    </button>
  );

  expect(renderedComponent.getByTestId("menu-button").textContent.trim()).toBe(
    "Menu"
  );
});

test("error page", () => {
  const renderedComponent = render(<ErrorPage />);
  expect(renderedComponent.getByTestId("error-page").textContent.trim()).toBe(
    "Error 404: Oops! This page is not found"
  );
});

test("marker render", () => {
  const renderedComponent = render(
    <Marker
      key={2}
      lat={33}
      lng={-110}
      text={2}
      tooltip={"title"}
      onClick={() => {}}
      isActive={true}
    />
  );

  expect(renderedComponent.getByTestId("marker").textContent.trim()).toBe("2");
});

test("marker attribute", () => {
  const renderedComponent = render(
    <Marker
      key={2}
      lat={33}
      lng={-110}
      text={2}
      tooltip={"title"}
      onClick={() => {}}
      isActive={true}
    />
  );

  expect(renderedComponent.getByTestId("marker")).toHaveAttribute("title");
});

test("marker is active", () => {
  const renderedComponent = render(
    <Marker
      key={2}
      lat={33}
      lng={-110}
      text={2}
      tooltip={"title"}
      onClick={() => {}}
      isActive={true}
    />
  );

  expect(renderedComponent.getByTestId("marker-circle")).toHaveClass(
    "circle circle-selected"
  );
});

test("marker is not active", () => {
  const renderedComponent = render(
    <Marker
      key={2}
      lat={33}
      lng={-110}
      text={2}
      tooltip={"titletest"}
      onClick={() => {}}
      isActive={false}
    />
  );

  expect(renderedComponent.getByTestId("marker-circle")).toHaveClass("circle");
});

test("rating render", () => {
  const renderedComponent = render(
    <Rating rating={3}>
      {(isFilled, starNumber) => {
        const color = isFilled ? "#fcad03" : "#ddd";
        return (
          <button
            type="button"
            className="btn btn-link"
            data-testid="star-button"
            onClick={() => {}}
          >
            <FontAwesomeIcon icon={faStar} color={color} size={"2x"} />
          </button>
        );
      }}
    </Rating>
  );

  expect(renderedComponent.getAllByTestId("star-button").length).toBe(5);
});

test("rating render props", () => {
  const renderedComponent = render(
    <Rating rating={3}>
      {(isFilled, starNumber) => {
        const color = isFilled ? "#fcad03" : "#ddd";
        return (
          <button
            type="button"
            className="btn btn-link"
            data-testid="star-button"
            onClick={() => {}}
          >
            <FontAwesomeIcon
              icon={faStar}
              color={color}
              size={"2x"}
              data-testid={isFilled ? "filled-star" : "empty-star"}
            />
          </button>
        );
      }}
    </Rating>
  );

  expect(renderedComponent.getAllByTestId("filled-star").length).toBe(3);
  expect(renderedComponent.getAllByTestId("empty-star").length).toBe(2);
});

test("rating click event", () => {
  const onClick = jest.fn();
  const renderedComponent = render(
    <Rating rating={1} total={5}>
      {(isFilled, starNumber) => {
        const color = isFilled ? "yellow" : "#ddd";

        return (
          <button
            type="button"
            className="btn btn-link"
            data-testid="star-button"
            onClick={() => {
              onClick(starNumber);
            }}
          >
            <FontAwesomeIcon
              icon={faStar}
              color={color}
              size="3x"
              data-testid={isFilled ? "filled-star" : "empty-star"}
            />
          </button>
        );
      }}
    </Rating>
  );

  const thirdStar = renderedComponent.getAllByTestId("star-button")[2];
  fireEvent.click(thirdStar);

  expect(onClick).toHaveBeenCalledWith(3);
});

test("card is active", () => {
  const renderedComponent = render(
    <MemoryRouter>
      <Card
        key={2}
        id={2}
        title={"title"}
        address={"xxx street"}
        spaces={100}
        onClick={() => {}}
        isActive={true}
      />
    </MemoryRouter>
  );

  expect(renderedComponent.getByTestId("card-style")).toHaveClass(
    "card border-dark mb-3"
  );
});

test("card is not active", () => {
  const renderedComponent = render(
    <MemoryRouter>
      <Card
        key={2}
        id={2}
        title={"title"}
        address={"xxx street"}
        spaces={100}
        onClick={() => {}}
        isActive={false}
      />
    </MemoryRouter>
  );

  expect(renderedComponent.getByTestId("card-style")).toHaveClass("card mb-3");
});
