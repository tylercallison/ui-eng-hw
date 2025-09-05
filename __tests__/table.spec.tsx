import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Table } from "@/components/Table";
import { addUuidToFiles } from "@/lib/utils";
import { fileList } from "@/lib/file-list";

describe("Table Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders only header row when empty files list", () => {
    render(<Table files={[]} />);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows).toHaveLength(1);
  });

  it("renders all elements of file list", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows).toHaveLength(7);
  });

  it("disabled items cannot be selected", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const selectAll = screen.getByRole<HTMLInputElement>("checkbox", {
      name: "None Selected",
    });
    const tableRows = screen.getAllByRole("row");
    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });

    act(() => {
      tableRows[1].click();
    });

    expect(selectAll).not.toBeChecked();
    expect(downloadButton).toBeDisabled();
  });

  it("select all is checked when all selectable list items are selected", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const selectAll = screen.getByRole<HTMLInputElement>("checkbox", {
      name: "None Selected",
    });
    const tableRows = screen.getAllByRole("row");
    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });

    act(() => {
      tableRows[2].click();
      tableRows[3].click();
    });

    expect(selectAll).toBeChecked();
    expect(downloadButton).not.toBeDisabled();
  });

  it("select all is indeterminant when all selectable list items are selected", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const selectAll = screen.getByRole<HTMLInputElement>("checkbox", {
      name: "None Selected",
    });
    const tableRows = screen.getAllByRole("row");
    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });

    act(() => {
      tableRows[3].click();
    });

    expect(selectAll.indeterminate).toBeTruthy();
    expect(downloadButton).not.toBeDisabled();
  });

  it("select all selects all selectable items when clicked", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const selectAll = screen.getByRole<HTMLInputElement>("checkbox", {
      name: "None Selected",
    });
    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });

    act(() => {
      selectAll.click();
    });

    const tableRows = screen.getAllByRole<HTMLInputElement>("checkbox", {
      checked: true,
    });

    expect(selectAll).toBeChecked();
    expect(tableRows).toHaveLength(3);
    expect(downloadButton).not.toBeDisabled();
  });

  it("select all deselects all items when clicked twice", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const selectAll = screen.getByRole<HTMLInputElement>("checkbox", {
      name: "None Selected",
    });
    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });

    act(() => {
      selectAll.click();
      selectAll.click();
    });

    const tableRows = screen.getAllByRole<HTMLInputElement>("checkbox", {
      checked: false,
    });

    expect(selectAll).not.toBeChecked();
    expect(tableRows).toHaveLength(7);
    expect(downloadButton).toBeDisabled();
  });

  it("shows alert when download button is clicked with select all items selected", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const selectAll = screen.getByRole<HTMLInputElement>("checkbox", {
      name: "None Selected",
    });

    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });
    expect(downloadButton).toBeInTheDocument();

    window.alert = jest.fn();

    act(() => {
      selectAll.click();
      downloadButton.click();
    });

    expect(downloadButton).not.toBeDisabled();
    expect(window.alert).toHaveBeenCalledWith(
      "Luigi: \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe\nPeach: \\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    );
  });

  it("shows alert when download button is clicked with some items selected", () => {
    render(<Table files={addUuidToFiles(fileList)} />);

    const tableRows = screen.getAllByRole("row");
    const downloadButton = screen.getByRole("button", {
      name: "Download Selected",
    });
    expect(downloadButton).toBeInTheDocument();

    window.alert = jest.fn();

    act(() => {
      tableRows[3].click();
    });

    act(() => {
      downloadButton.click();
    });

    expect(downloadButton).not.toBeDisabled();
    expect(window.alert).toHaveBeenCalledWith(
      "Peach: \\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    );
  });
});
