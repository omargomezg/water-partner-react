import { useState } from "react";

type Props = {
    onChange: (value: string) => void;
    value: string;
}

const antdButtonStyle: React.CSSProperties = {
  display: "inline-flex", // Mejor para alinear iconos si los agregas
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 400,
  whiteSpace: "nowrap",
  textAlign: "center",
  backgroundImage: "none",
  backgroundColor: "#1677ff",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)", // Curva de animación de AntD
  userSelect: "none",
  touchAction: "manipulation",
  lineHeight: "1.5714285714285714", // Line-height exacto de AntD
  padding: "4px 15px", // Padding estándar del botón "default"
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid #1677ff", // Los botones de AntD tienen borde
  boxShadow: "0 2px 0 rgba(5, 145, 255, 0.08)",
};

export const FileUpload: React.FC<Props> = ({value, onChange}) => {
    const [file, setFile] = useState<string | null>(null);
    const [error, setError] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!validateFile(e.target.files[0])) {
      return;
    }
    const data = new FileReader();
    data.addEventListener("load", () => {
        const base64 = data.result as string;
        setFile(base64) ;
        onChange(base64);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const validateFile = (file: any) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    const maxSize = 1024 * 1024; // 1 MB in bytes

    if (!allowedTypes.includes(file.type)) {
      setError("formato");
      return false;
    }

    if (file.size > maxSize) {
      setError("size");
      return false;
    }
    return true;
  };
    return (
        <div style={{textAlign: "center"}}>
            <label
              htmlFor="file-upload"
              style={antdButtonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#4096ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1677ff")
              }
            >
              {value ? "Cambiar imagen" : "Seleccionar imagen"}
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>
    )
}