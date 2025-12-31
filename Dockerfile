# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy only csproj and restore dependencies
COPY ["Note-Management-App.csproj", "./"]
RUN dotnet restore "Note-Management-App.csproj"

# Copy the rest of the source code
COPY . .

# Publish the project
RUN dotnet publish "Note-Management-App.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copy published files from build stage
COPY --from=build /app/publish .

# Expose ports
EXPOSE 80
EXPOSE 443

# Set entrypoint
ENTRYPOINT ["dotnet", "Note-Management-App.dll"]