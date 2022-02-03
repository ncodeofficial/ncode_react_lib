import React, { CSSProperties } from "react";

export class StyleSheet {
  static create(css: { [key: string]: CSSProperties }) {
    return css;
  }
}

type Props = {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  height?: number;
  width?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  [key: string]: any;
};

const flexStyle = StyleSheet.create({
  vstack: {
    display: "flex",
    flexDirection: "column",
  },
  hstack: {
    display: "flex",
    flexDirection: "row",
  },
  zstack: {
    position: "absolute",
  },
  spacer: {
    display: "flex",
    flexGrow: 1,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const VStack = (props: Props) => {
  const s = {
    marginTop: props.mt,
    marginRight: props.mr,
    marginBottom: props.mb,
    marginLeft: props.ml,
    paddingTop: props.pt,
    paddingRight: props.pr,
    paddingBottom: props.pb,
    paddingLeft: props.pl,
    ...props.style,
  };
  return <div style={{ ...flexStyle.vstack, ...s }}>{props.children}</div>;
};

export const HStack = (props: Props) => {
  const s = {
    marginTop: props.mt,
    marginRight: props.mr,
    marginBottom: props.mb,
    marginLeft: props.ml,
    paddingTop: props.pt,
    paddingRight: props.pr,
    paddingBottom: props.pb,
    paddingLeft: props.pl,
    ...props.style,
  };
  return <div style={{ ...flexStyle.hstack, ...s }}>{props.children}</div>;
};

export const ZStack = ({ style, children }: Props) => {
  return (
    <div style={{ ...style }}>
      {Array.isArray(children) &&
        children.map((c, i) => {
          return (
            <div
              key={i}
              style={{
                zIndex: i / 100.0,
                position: "absolute",
                display: "flex",
              }}
            >
              {c}
            </div>
          );
        })}
      {!Array.isArray(children) && children}
    </div>
  );
};

export const Spacer = () => {
  return <div style={flexStyle.spacer} />;
};

export const Center = ({ style, children }: Props) => {
  return <div style={{ ...flexStyle.center, ...style }}>{children}</div>;
};
