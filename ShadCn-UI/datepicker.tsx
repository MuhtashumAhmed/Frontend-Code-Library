// shadcn date picker using popover 
// controll using RHF 
<Controller
              control={control}
              name="requested_date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-transparent border border-myBrown rounded outline-none focus:ring-1 focus:ring-myBrown h-10 hover:bg-transparent ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      <Calendar1Icon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>


                  <PopoverContent className="w-auto p-0  ">
                    <Calendar
                      mode="single"
                      selected={field.value as any}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />