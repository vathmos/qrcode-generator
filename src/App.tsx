import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Form, Input } from "@heroui/react"
import { ArrowDownToLine } from "lucide-react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react"
import { useRef, useState } from "react"



function App() {
  const [formData, setFormData] = useState({ qrtext: "", bgColor: "#FFFFFF", fgColor: "#000000" })
  const qrtextRef = useRef<HTMLInputElement>(null);
  const bgColorRef = useRef<HTMLInputElement>(null);
  const fgColorRef = useRef<HTMLInputElement>(null);
  const handleFormChange = () => {
    setFormData({ qrtext: qrtextRef.current?.value || "", bgColor: bgColorRef.current?.value || "", fgColor: fgColorRef.current?.value || "" })
  }

  const downloadQRCode = (type: string) => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    const imageUrl = canvas
      .toDataURL(`image/${type}`)
      .replace(`image/${type}`, "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = `qr-code.${type}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const downloadSvg = () => {
    const svg = document.getElementById("qr-svg") as unknown as SVGElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="flex w-screen h-screen">
      <div className="sm:h-screen w-screen flex flex-col sm:flex-row justify-evenly items-center p-4">
        <div className="">
          <Form className="w-full max-w-xs">
            <Input
              isRequired
              errorMessage="Please enter a valid text"
              label="Text"
              labelPlacement="outside"
              name="qrtext"
              placeholder="Enter your text/URL here"
              type="text"
              ref={qrtextRef}
              onChange={handleFormChange}
              value={formData.qrtext}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid background color"
              label="Background Color"
              labelPlacement="outside"
              name="bgcolor"
              placeholder="Enter a color hex code/name"
              ref={bgColorRef}
              onChange={handleFormChange}
              value={formData.bgColor}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid foreground color"
              label="Foreground Color"
              labelPlacement="outside"
              name="fgcolor"
              placeholder="Enter a color hex code/name"
              ref={fgColorRef}
              onChange={handleFormChange}
              value={formData.fgColor}
            />
            <Dropdown>
              <DropdownTrigger className="self-center">
                <Button variant="bordered" color="primary" className="my-4">Download<ArrowDownToLine size={20} /></Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Download QR Code">
                <DropdownItem key="png" onPress={() => downloadQRCode("png")}>PNG</DropdownItem>
                <DropdownItem key="jpeg" onPress={() => downloadQRCode("jpeg")}>JPEG</DropdownItem>
                <DropdownItem key="svg" onPress={() => downloadSvg()}>SVG</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Form>
        </div>
        <div className="border-1 border-black mb-4">
          <QRCodeSVG id="qr-svg" value={formData.qrtext} className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] min-w-[200px] min-h-[200px]" bgColor={formData.bgColor} fgColor={formData.fgColor} marginSize={2} />
        </div>
        <QRCodeCanvas className="hidden" id="qr-canvas" value={formData.qrtext} size={500} bgColor={formData.bgColor} fgColor={formData.fgColor} marginSize={2} />

      </div>
    </div>
  )
}

export default App
