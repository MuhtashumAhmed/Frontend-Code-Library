// first install react-dropzone
//  npm install --save react-dropzone


//  ========= UI part ==========
{/* image upload */}
        <div className="mt-6  ">
          <label className="text-myDarkGray text-xs font-semibold">
            Official License Image / Certificate
          </label>
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed border-[#C7C4D7] rounded-lg flex items-center justify-center min-h-65 p-4 text-center ${
              isDragActive ? "border-myRed bg-myAliceBlue" : "bg-[#EBEBEB]"
            }`}
          >
            <input {...getInputProps()} />


            {file ? (
              <div className="relative w-full flex flex-col items-center">
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-0 right-0 h-8 w-8 rounded-full bg-white shadow flex items-center cursor-pointer justify-center"
                >
                  <X />
                </button>


                {/* Image Preview */}
                {isImage ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    height={400}
                    width={400}
                    className="max-h-48 object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    {/* File Icon */}
                    <FileText />


                    <div>
                      <p className="font-medium text-myBluishColor">
                        {file.name}
                      </p>


                      <p className="text-sm text-myDarkGray">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : isDragActive ? (
              <p className="text-myBluishColor text-base">
                Drop the file here ...
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <span className="mx-auto">
                  <svg
                    width="44"
                    height="32"
                    viewBox="0 0 44 32"
                    fill="none"
                    xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
                  >
                    <path
                      d="M11 32C7.96667 32 5.375 30.95 3.225 28.85C1.075 26.75 5.96046e-08 24.1833 5.96046e-08 21.15C5.96046e-08 18.55 0.783333 16.2333 2.35 14.2C3.91667 12.1667 5.96667 10.8667 8.5 10.3C9.33333 7.23333 11 4.75 13.5 2.85C16 0.950001 18.8333 9.53674e-07 22 9.53674e-07C25.9 9.53674e-07 29.2083 1.35833 31.925 4.075C34.6417 6.79167 36 10.1 36 14C38.3 14.2667 40.2083 15.2583 41.725 16.975C43.2417 18.6917 44 20.7 44 23C44 25.5 43.125 27.625 41.375 29.375C39.625 31.125 37.5 32 35 32H24C22.9 32 21.9583 31.6083 21.175 30.825C20.3917 30.0417 20 29.1 20 28V17.7L16.8 20.8L14 18L22 10L30 18L27.2 20.8L24 17.7V28H35C36.4 28 37.5833 27.5167 38.55 26.55C39.5167 25.5833 40 24.4 40 23C40 21.6 39.5167 20.4167 38.55 19.45C37.5833 18.4833 36.4 18 35 18H32V14C32 11.2333 31.025 8.875 29.075 6.925C27.125 4.975 24.7667 4 22 4C19.2333 4 16.875 4.975 14.925 6.925C12.975 8.875 12 11.2333 12 14H11C9.06667 14 7.41667 14.6833 6.05 16.05C4.68333 17.4167 4 19.0667 4 21C4 22.9333 4.68333 24.5833 6.05 25.95C7.41667 27.3167 9.06667 28 11 28H16V32H11Z"
                      fill="#312B51"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-myBluishColor text-base font-normal">
                    Drag and drop certificate scan here
                  </p>
                  <p className="text-myDarkGray text-sm ">
                    PNG, JPG or PDF up to 10MB
                  </p>
                </div>
                <Button className="primary-button rounded-md! bg-transparent! text-myRed! text-xs! font-semibold border! border-myRed! w-max! mx-auto mt- ">
                  Select File
                </Button>
              </div>
            )}
          </div>
        </div>



// ===============Logic or functions ========
 const [file, setFile] = useState<File | null>(null);
  const isImage = file?.type.startsWith("image/");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
  };
  const [preview, setPreview] = useState("");


  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) return;


    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);


    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

