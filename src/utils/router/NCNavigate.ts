export interface NCNavigate {
  _goBack: () => void;
  _windowOpen: (path: string) => void;
  _moveTo: (path: string) => void;
  _originGoTo: () => void;
  _targetGoTo: (originalPath: string, targetPath: string) => void;
  _currentPath: () => string;
  _replace: (path: string) => void;
}
