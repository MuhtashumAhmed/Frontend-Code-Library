<div>
              <label className="text-myDarkGray text-xs mb-2 ">
                Pay Frequency
              </label>
              <Controller
                name="payFrequency"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={`w-full p-3! h-12! border border-[#C7C4D7]! bg-[#F8F9FF]  rounded-[8px] font-sora! ${errors.payFrequency && "border-red-600!"}  `}
                    >
                      <SelectValue placeholder="Bi-Weekly" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="font-sora!">
                      <SelectGroup>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.payFrequency && (
                <p className="text-red-700 font-inter text-sm">
                  {errors.payFrequency.message}
                </p>
              )}
            </div>
 <div>
