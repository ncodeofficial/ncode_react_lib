import { NavigateFunction } from "react-router";
import { NCNavigate } from "./NCNavigate";

export class NCNavigator implements NCNavigate {
  private static instance: NCNavigate;
  private originalPath: string;
  private readonly navigate: null | NavigateFunction;

  constructor(initPath: string, navigate: NavigateFunction) {
    NCNavigator.instance = this;
    this.originalPath = initPath;
    this.navigate = navigate;
  }

  private _assertedNavigate = (
    callbackFn: (navigate: NavigateFunction) => void
  ): void => {
    const NEED_TO_NAVIGATE_ERROR_MSG =
      "When generating as a 'new' keyword, put [react-router-dom's 'useNavigate'] with the arguments value. You can make App.tsx more convenient for withNavigateHook.tsx";

    if (!this.navigate) throw new Error(NEED_TO_NAVIGATE_ERROR_MSG);
    callbackFn(this.navigate);
  };

  _goBack = (): void => {
    this._assertedNavigate((n) => n(-1));
  };

  _windowOpen = (path: string): void => {
    window.open(path);
  };

  _moveTo = (path: string): void => {
    this._assertedNavigate((n) => n(path));
  };

  _originGoTo = (): void => {
    this._assertedNavigate((n) => n(this.originalPath));
  };

  _targetGoTo = (originalPath: string, targetPath: string): void => {
    this._assertedNavigate((n) => {
      this.originalPath = originalPath;
      n(targetPath);
    });
  };

  _currentPath = (): string => {
    return window.location.pathname;
  };

  _replace = (path: string): void => {
    this._assertedNavigate((n) => n(path, { replace: true }));
  };

  /*
   * Static Code
   */
  private static assertedInstance = (
    callbackFn: (instance: NCNavigate) => void
  ): void => {
    const NEED_TO_NAVIGATE_ERROR_MSG = "Please register first.";

    if (!NCNavigator.instance) throw new Error(NEED_TO_NAVIGATE_ERROR_MSG);
    callbackFn(this.instance);
  };

  static goBack() {
    NCNavigator.assertedInstance((i) => i._goBack());
  }

  static windowOpen(path: string) {
    NCNavigator.assertedInstance((i) => i._windowOpen(path));
  }

  static moveTo(path: string) {
    NCNavigator.assertedInstance((i) => i._moveTo(path));
  }

  static originGoTo() {
    NCNavigator.assertedInstance((i) => i._originGoTo());
  }

  static targetGoTo(originalPath: string, targetPath: string) {
    NCNavigator.assertedInstance((i) =>
      i._targetGoTo(originalPath, targetPath)
    );
  }

  static currentPath() {
    NCNavigator.assertedInstance((i) => i._currentPath());
  }

  static replace(path: string) {
    NCNavigator.assertedInstance((i) => i._replace(path));
  }
}
